import { useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NewsIllustration } from '../components/NewsIllustration';
import { formatNewsDate, getNewsById } from '../data/news';
import type { Palette } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';

export function NewsDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { c } = useTheme();
  const styles = useMemo(() => createStyles(c), [c]);
  const item = getNewsById(id);

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <ScrollView contentContainerStyle={styles.content}>
        {item ? (
          <>
            <View style={styles.illustration}>
              <NewsIllustration type={item.illustration} />
            </View>
            <Text accessibilityRole="header" style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>{formatNewsDate(item.date)}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.body}>{item.content}</Text>
          </>
        ) : (
          <Text style={styles.body}>Notícia não encontrada.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (c: Palette) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: c.background },
  content: { width: '100%', maxWidth: 640, alignSelf: 'center', padding: 20, paddingBottom: 28 },
  illustration: { borderRadius: 12, overflow: 'hidden', marginBottom: 16 },
  title: { color: c.text, fontSize: 26, fontWeight: '700', lineHeight: 32 },
  date: { color: c.muted, fontSize: 13, marginTop: 8 },
  description: { color: c.text, fontSize: 17, fontWeight: '600', lineHeight: 24, marginTop: 16 },
  body: { color: c.text, fontSize: 16, lineHeight: 25, marginTop: 12 },
});
