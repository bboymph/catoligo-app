import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useState } from 'react';
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
import type { Palette } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';
import { getErrorMessage } from '../services/api';
import { login } from '../services/auth';
import { checkHealth } from '../services/health';

const UNAVAILABLE_MESSAGE = 'Estamos com uma instabilidade no momento, tenta novamente mais tarde.';

export function LoginScreen() {
  const { c, isDark } = useTheme();
  const styles = useMemo(() => createStyles(c), [c]);
  const [recoveryMessageVisible, setRecoveryMessageVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unavailableVisible, setUnavailableVisible] = useState(false);

  useEffect(() => {
    let active = true;
    checkHealth().then((ok) => {
      if (active && !ok) setUnavailableVisible(true);
    });
    return () => {
      active = false;
    };
  }, []);

  async function handleLogin() {
    if (loading) return;
    if (!email.trim() || !password) {
      setError('Informe o e-mail e a senha.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await login({ email: email.trim(), password });
      router.replace('/home');
    } catch (err) {
      setError(getErrorMessage(err, 'Não foi possível entrar. Verifique seus dados.'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <AlertCard
        visible={unavailableVisible}
        title="Serviço indisponível"
        message={UNAVAILABLE_MESSAGE}
        onClose={() => setUnavailableVisible(false)}
      />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.form}>
            <Image
              accessibilityLabel="catoliGO"
              source={require('../../assets/catoligo-logo.png')}
              style={styles.logo}
            />

            <Text style={styles.label}>E-mail</Text>
            <TextInput
              accessibilityLabel="E-mail"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              style={[styles.input, styles.loginInput]}
            />

            <Text style={styles.label}>Senha</Text>
            <View style={[styles.input, styles.passwordContainer]}>
              <TextInput
                accessibilityLabel="Senha"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="current-password"
                secureTextEntry={!passwordVisible}
                value={password}
                onChangeText={setPassword}
                onSubmitEditing={handleLogin}
                style={styles.passwordInput}
              />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={passwordVisible ? 'Ocultar senha' : 'Mostrar senha'}
                onPress={() => setPasswordVisible((visible) => !visible)}
                style={styles.visibilityButton}
              >
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M2 12C4.5 8 8 6 12 6s7.5 2 10 6c-2.5 4-6 6-10 6s-7.5-2-10-6Z"
                    stroke={c.text}
                    strokeWidth={1.8}
                  />
                  <Circle cx={12} cy={12} r={3} stroke={c.text} strokeWidth={1.8} />
                  {!passwordVisible && (
                    <Line x1={3} y1={3} x2={21} y2={21} stroke={c.text} strokeWidth={1.8} />
                  )}
                </Svg>
              </Pressable>
            </View>

            {error && (
              <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text>
            )}

            <Pressable
              accessibilityRole="button"
              disabled={loading}
              onPress={handleLogin}
              style={({ pressed }) => [styles.button, (pressed || loading) && styles.pressed]}
            >
              {loading ? (
                <ActivityIndicator color={c.onPrimary} />
              ) : (
                <Text style={styles.buttonText}>Entrar</Text>
              )}
            </Pressable>

            <Pressable
              accessibilityRole="button"
              onPress={() => setRecoveryMessageVisible(true)}
              style={styles.recovery}
            >
              <Text style={styles.recoveryText}>Esqueci minha senha</Text>
            </Pressable>
            {recoveryMessageVisible && (
              <Text accessibilityLiveRegion="polite" style={styles.message}>
                A recuperação de senha ainda não está disponível.
              </Text>
            )}
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push('/signup')}
              style={styles.recovery}
            >
              <Text style={styles.recoveryText}>Criar conta</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const createStyles = (c: Palette) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: c.surface,
  },
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  form: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  logo: {
    width: 160,
    height: 160,
    alignSelf: 'center',
    marginBottom: 32,
  },
  label: {
    color: c.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
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
  loginInput: {
    paddingHorizontal: 12,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    color: c.text,
    fontSize: 16,
    minHeight: 48,
    paddingHorizontal: 12,
  },
  visibilityButton: {
    width: 48,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: c.primary,
    borderRadius: 24,
    minHeight: 48,
    marginTop: 4,
  },
  pressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: c.onPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  recovery: {
    alignSelf: 'center',
    padding: 16,
  },
  recoveryText: {
    color: c.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: c.danger,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
  },
  message: {
    color: c.text,
    fontSize: 14,
    textAlign: 'center',
  },
});
