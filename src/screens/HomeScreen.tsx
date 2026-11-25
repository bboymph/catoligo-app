import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, RefreshControl, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Rect } from 'react-native-svg';

import { NewsIllustration } from '../components/NewsIllustration';
import { fetchNews, filterNews, formatNewsDate, news as initialNews, type NewsItem } from '../data/news';
import type { Palette } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';

export function HomeScreen() {
  const { c } = useTheme();
  const router = useRouter();
  const styles = useMemo(() => createStyles(c), [c]);
  const [query, setQuery] = useState('');
  const [compact, setCompact] = useState(false);
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [refreshing, setRefreshing] = useState(false);
  const filteredNews = useMemo(() => filterNews(news, query), [news, query]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      setNews(await fetchNews());
    } finally {
      setRefreshing(false);
    }
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <FlatList
        data={filteredNews}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[c.primary]}
            tintColor={c.primary}
          />
        }
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Notícias em destaque</Text>
            <Text style={styles.subtitle}>Conteúdo ilustrativo para demonstração</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={compact ? 'Alterar para visualização completa' : 'Alterar para visualização em lista'}
              onPress={() => setCompact((value) => !value)}
              style={({ pressed }) => [styles.viewToggle, pressed && styles.pressed]}
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                {compact ? (
                  <>
                    <Rect x={3} y={3} width={18} height={10} rx={2} stroke={c.text} strokeWidth={1.8} />
                    <Path d="M3 17h18M3 21h12" stroke={c.text} strokeWidth={1.8} strokeLinecap="round" />
                  </>
                ) : (
                  <>
                    <Rect x={3} y={4} width={5} height={5} rx={1} stroke={c.text} strokeWidth={1.8} />
                    <Rect x={3} y={15} width={5} height={5} rx={1} stroke={c.text} strokeWidth={1.8} />
                    <Path d="M12 6.5h9M12 17.5h9" stroke={c.text} strokeWidth={1.8} strokeLinecap="round" />
                  </>
                )}
              </Svg>
            </Pressable>
            <TextInput
              accessibilityLabel="Pesquisar notícias"
              placeholder="Pesquisar notícias"
              placeholderTextColor={c.placeholder}
              value={query}
              onChangeText={setQuery}
              style={styles.search}
            />
          </View>
        }
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma notícia encontrada.</Text>}
        renderItem={({ item }) => {
          const open = () => router.push({ pathname: '/news/[id]', params: { id: item.id } });
          return compact ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Abrir notícia ${item.title}`}
              onPress={open}
              style={({ pressed }) => [styles.compactCard, pressed && styles.pressed]}
            >
              <NewsIllustration type={item.illustration} compact />
              <View style={styles.compactContent}>
                <Text style={styles.compactTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.compactDescription} numberOfLines={2}>{item.description}</Text>
                <Text style={styles.date}>{formatNewsDate(item.date)}</Text>
              </View>
            </Pressable>
          ) : (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Abrir notícia ${item.title}`}
              onPress={open}
              style={({ pressed }) => [styles.card, pressed && styles.pressed]}
            >
              <NewsIllustration type={item.illustration} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.date}>{formatNewsDate(item.date)}</Text>
              </View>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}

const createStyles = (c: Palette) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: c.background },
  content: { width: '100%', maxWidth: 640, alignSelf: 'center', padding: 20, paddingBottom: 28 },
  title: { color: c.text, fontSize: 28, fontWeight: '700' },
  subtitle: { color: c.muted, fontSize: 14, marginTop: 6 },
  viewToggle: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: c.input,
    marginTop: 16,
  },
  pressed: { opacity: 0.7 },
  search: {
    backgroundColor: c.input,
    borderRadius: 12,
    color: c.text,
    fontSize: 16,
    minHeight: 48,
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 24,
  },
  compactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: c.surface,
    borderColor: c.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
  },
  compactContent: { flex: 1 },
  compactTitle: { color: c.text, fontSize: 16, fontWeight: '700', lineHeight: 21 },
  compactDescription: { color: c.muted, fontSize: 14, lineHeight: 19, marginTop: 2 },
  card: {
    backgroundColor: c.surface,
    borderColor: c.border,
    borderWidth: 1,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  cardContent: { padding: 16 },
  cardTitle: { color: c.text, fontSize: 19, fontWeight: '700', lineHeight: 26 },
  description: { color: c.muted, fontSize: 15, lineHeight: 22, marginTop: 8 },
  date: { color: c.subtle, fontSize: 13, marginTop: 8 },
  empty: { color: c.muted, fontSize: 16, textAlign: 'center', marginTop: 20 },
});
