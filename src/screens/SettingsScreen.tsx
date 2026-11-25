import { useMemo } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, type Palette } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';

export function SettingsScreen() {
  const { c, isDark, setDark } = useTheme();
  const styles = useMemo(() => createStyles(c), [c]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.label}>Tema escuro</Text>
          <Switch
            accessibilityLabel="Tema escuro"
            value={isDark}
            onValueChange={setDark}
            trackColor={{ true: colors.primary, false: c.border }}
            thumbColor={isDark ? c.onPrimary : c.surface}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (c: Palette) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: c.background },
  content: { width: '100%', maxWidth: 640, alignSelf: 'center', padding: 20 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: c.surface,
    borderColor: c.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  label: { color: c.text, fontSize: 16, fontWeight: '600' },
});
