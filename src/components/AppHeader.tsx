import { useNavigation, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';

import { colors, type Palette } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';

export function AppHeader({ alwaysShowBack = false }: { alwaysShowBack?: boolean }) {
  const router = useRouter();
  const navigation = useNavigation();
  const { c } = useTheme();
  const styles = useMemo(() => createStyles(c), [c]);
  const [canGoBack, setCanGoBack] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  // O botão de voltar só aparece fora do início e quando há uma tela anterior no histórico.
  useEffect(() => {
    if (alwaysShowBack) {
      return;
    }
    const update = () => {
      const state = navigation.getState() as
        | { history?: unknown[]; index: number; routes: { name: string }[] }
        | undefined;
      const onHome = state?.routes[state.index]?.name === 'home';
      setCanGoBack(!onHome && (state?.history?.length ?? 0) > 1);
    };
    update();
    return navigation.addListener('state', update);
  }, [navigation, alwaysShowBack]);

  function closeMenu() {
    setMenuVisible(false);
  }

  function openProfile() {
    closeMenu();
    router.push('/profile');
  }

  function openSettings() {
    closeMenu();
    router.push('/settings');
  }

  function signOut() {
    closeMenu();
    router.replace('/');
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.bar}>
        <View style={styles.side}>
          {(alwaysShowBack || canGoBack) && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Voltar"
              onPress={() => navigation.goBack()}
              style={styles.iconButton}
            >
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <Path d="M15 5l-7 7 7 7" stroke={colors.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </Pressable>
          )}
        </View>

        <Text accessibilityRole="header" style={styles.title}>
          catoliGO
        </Text>

        <View style={[styles.side, styles.sideEnd]}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Abrir menu do usuário"
            onPress={() => setMenuVisible(true)}
            style={styles.iconButton}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Circle cx={12} cy={8} r={4} stroke={colors.text} strokeWidth={1.8} />
              <Path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" stroke={colors.text} strokeWidth={1.8} strokeLinecap="round" />
            </Svg>
          </Pressable>
        </View>
      </View>

      <Modal transparent animationType="fade" visible={menuVisible} onRequestClose={closeMenu}>
        <Pressable accessibilityLabel="Fechar menu" style={styles.backdrop} onPress={closeMenu}>
          <SafeAreaView edges={['top', 'right']} style={styles.menuAnchor}>
            <View style={styles.menu}>
              <MenuItem label="Meu Perfil" onPress={openProfile} />
              <MenuItem label="Configurações" onPress={openSettings} />
              <MenuItem label="Sair" onPress={signOut} />
            </View>
          </SafeAreaView>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

function MenuItem({ label, onPress }: { label: string; onPress: () => void }) {
  const { c } = useTheme();
  const styles = useMemo(() => createStyles(c), [c]);

  return (
    <Pressable
      accessibilityRole="menuitem"
      onPress={onPress}
      style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
    >
      <Text style={styles.menuText}>{label}</Text>
    </Pressable>
  );
}

const createStyles = (c: Palette) => StyleSheet.create({
  safeArea: { backgroundColor: colors.primary },
  bar: { height: 56, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8 },
  side: { width: 48, alignItems: 'flex-start' },
  sideEnd: { alignItems: 'flex-end' },
  iconButton: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  title: { flex: 1, color: colors.text, fontSize: 20, fontWeight: '700', textAlign: 'center' },
  backdrop: { flex: 1 },
  menuAnchor: { alignItems: 'flex-end' },
  menu: {
    width: 200,
    backgroundColor: c.surface,
    borderRadius: 12,
    marginTop: 52,
    marginRight: 8,
    paddingVertical: 4,
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
  },
  menuItem: { minHeight: 48, justifyContent: 'center', paddingHorizontal: 16 },
  menuItemPressed: { backgroundColor: c.pressed },
  menuText: { color: c.text, fontSize: 16 },
});
