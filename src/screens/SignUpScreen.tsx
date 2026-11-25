import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Line, Path } from 'react-native-svg';

import { AlertCard } from '../components/AlertCard';
import { getErrorMessage } from '../services/api';
import { signUp } from '../services/auth';
import type { Palette } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';
import { validateSignUp } from '../utils/signUpValidation';

export function SignUpScreen() {
  const { c, isDark } = useTheme();
  const styles = useMemo(() => createStyles(c), [c]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const submitting = useRef(false);
  const payload = {
    name: name.trim(),
    email: email.trim(),
    password,
    confirm_password: confirmPassword,
  };
  const fieldErrors = submitted ? validateSignUp(payload) : {};

  async function handleSignUp() {
    if (submitting.current) return;
    setSubmitted(true);
    setError(null);
    if (Object.keys(validateSignUp(payload)).length > 0) return;

    submitting.current = true;
    setLoading(true);
    try {
      await signUp(payload);
      setSuccessVisible(true);
    } catch (err) {
      setError(getErrorMessage(err, 'Não foi possível realizar o cadastro. Tente novamente.'));
      submitting.current = false;
      setLoading(false);
    }
  }

  function goToLogin() {
    if (successVisible) {
      setSuccessVisible(false);
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setSubmitted(false);
      submitting.current = false;
      setLoading(false);
    }
    router.navigate('/');
  }

  function passwordField(
    label: string,
    value: string,
    onChangeText: (value: string) => void,
    visible: boolean,
    setVisible: (visible: boolean) => void,
    fieldError?: string,
    isConfirmation = false,
  ) {
    return (
      <>
        <Text style={styles.label}>{label}</Text>
        <View style={[styles.input, styles.passwordContainer, fieldError && styles.invalidInput]}>
          <TextInput
            accessibilityLabel={label}
            accessibilityHint={fieldError}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="new-password"
            secureTextEntry={!visible}
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={isConfirmation ? () => { void handleSignUp(); } : undefined}
            editable={!loading}
            style={styles.passwordInput}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${visible ? 'Ocultar' : 'Mostrar'} ${label.toLowerCase()}`}
            onPress={() => setVisible(!visible)}
            style={styles.visibilityButton}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path
                d="M2 12C4.5 8 8 6 12 6s7.5 2 10 6c-2.5 4-6 6-10 6s-7.5-2-10-6Z"
                stroke={c.text}
                strokeWidth={1.8}
              />
              <Circle cx={12} cy={12} r={3} stroke={c.text} strokeWidth={1.8} />
              {!visible && (
                <Line x1={3} y1={3} x2={21} y2={21} stroke={c.text} strokeWidth={1.8} />
              )}
            </Svg>
          </Pressable>
        </View>
        {fieldError && (
          <Text accessibilityLiveRegion="polite" style={styles.fieldError}>{fieldError}</Text>
        )}
      </>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <AlertCard
        visible={successVisible}
        title="Cadastro realizado"
        message="Sua conta foi criada com sucesso. Faça login para continuar."
        buttonLabel="Ir para o login"
        onClose={goToLogin}
      />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Voltar para o login"
          disabled={loading}
          onPress={goToLogin}
          style={({ pressed }) => [styles.backButton, (pressed || loading) && styles.pressed]}
        >
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
            <Path d="M19 12H5m0 0 7-7m-7 7 7 7" stroke={c.accent} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
          <Text style={styles.backText}>Voltar para o login</Text>
        </Pressable>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.form}>
            <Image
              accessibilityLabel="catoliGO"
              source={require('../../assets/catoligo-logo.png')}
              style={styles.logo}
            />

            <Text style={styles.label}>Nome</Text>
            <TextInput
              accessibilityLabel="Nome"
              accessibilityHint={fieldErrors.name}
              autoCapitalize="words"
              autoComplete="name"
              value={name}
              onChangeText={setName}
              editable={!loading}
              style={[styles.input, styles.textInput, fieldErrors.name && styles.invalidInput]}
            />
            {fieldErrors.name && (
              <Text accessibilityLiveRegion="polite" style={styles.fieldError}>{fieldErrors.name}</Text>
            )}

            <Text style={styles.label}>E-mail</Text>
            <TextInput
              accessibilityLabel="E-mail"
              accessibilityHint={fieldErrors.email}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              editable={!loading}
              style={[styles.input, styles.textInput, fieldErrors.email && styles.invalidInput]}
            />
            {fieldErrors.email && (
              <Text accessibilityLiveRegion="polite" style={styles.fieldError}>{fieldErrors.email}</Text>
            )}

            {passwordField('Senha', password, setPassword, passwordVisible, setPasswordVisible, fieldErrors.password)}
            {!fieldErrors.password && (
              <Text style={styles.passwordHint}>A senha deve ter pelo menos 6 caracteres.</Text>
            )}
            {passwordField(
              'Confirmar senha',
              confirmPassword,
              setConfirmPassword,
              confirmPasswordVisible,
              setConfirmPasswordVisible,
              fieldErrors.confirm_password,
              true,
            )}

            {error && <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text>}

            <Pressable
              accessibilityRole="button"
              disabled={loading}
              onPress={handleSignUp}
              style={({ pressed }) => [styles.button, (pressed || loading) && styles.pressed]}
            >
              {loading ? (
                <ActivityIndicator color={c.onPrimary} />
              ) : (
                <Text style={styles.buttonText}>Cadastrar</Text>
              )}
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const createStyles = (c: Palette) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: c.surface },
  flex: { flex: 1 },
  backButton: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', minHeight: 48, paddingHorizontal: 24 },
  backText: { color: c.accent, fontSize: 16, fontWeight: '600', marginLeft: 8 },
  content: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  form: { width: '100%', maxWidth: 400, alignSelf: 'center' },
  logo: { width: 160, height: 160, alignSelf: 'center', marginBottom: 32 },
  label: { color: c.text, fontSize: 16, fontWeight: '600', marginBottom: 8 },
  input: {
    backgroundColor: c.input,
    borderWidth: 1,
    borderColor: c.inputBorder,
    borderRadius: 8,
    color: c.text,
    fontSize: 16,
    minHeight: 48,
    marginBottom: 20,
  },
  textInput: { paddingHorizontal: 12 },
  invalidInput: { borderColor: c.danger },
  passwordContainer: { flexDirection: 'row', alignItems: 'center' },
  passwordInput: { flex: 1, color: c.text, fontSize: 16, minHeight: 48, paddingHorizontal: 12 },
  visibilityButton: { width: 48, minHeight: 48, alignItems: 'center', justifyContent: 'center' },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: c.primary,
    borderRadius: 24,
    minHeight: 48,
    marginTop: 4,
  },
  pressed: { opacity: 0.8 },
  buttonText: { color: c.onPrimary, fontSize: 16, fontWeight: '700' },
  passwordHint: { color: c.muted, fontSize: 14, marginTop: -12, marginBottom: 20 },
  fieldError: { color: c.danger, fontSize: 14, marginTop: -12, marginBottom: 20 },
  error: { color: c.danger, fontSize: 14, textAlign: 'center', marginTop: 4 },
});
