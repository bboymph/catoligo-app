import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { Palette } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';

export function PlaceholderScreen({ title }: { title: string }) {
  const { c } = useTheme();
  const styles = useMemo(() => createStyles(c), [c]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>Esta seção estará disponível em breve.</Text>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (c: Palette) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: c.background },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { color: c.text, fontSize: 28, fontWeight: '700', marginBottom: 12 },
  message: { color: c.muted, fontSize: 16, textAlign: 'center' },
});
