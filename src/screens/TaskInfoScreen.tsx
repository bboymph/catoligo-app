import { useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TaskIcon } from '../components/TaskIcon';
import { getTaskInfo } from '../data/tasks';
import type { Palette } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';

export function TaskInfoScreen() {
  const { c } = useTheme();
  const styles = useMemo(() => createStyles(c), [c]);
  const { id } = useLocalSearchParams<{ id: string }>();
  const task = getTaskInfo(id);

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <ScrollView contentContainerStyle={styles.content}>
        {task ? (
          <>
            <View style={styles.header}>
              <TaskIcon type={task.icon} />
              <Text accessibilityRole="header" style={styles.title}>{task.info.Title}</Text>
            </View>
            <Text style={styles.description}>{task.info.Description}</Text>

            <Text style={styles.label}>Frequência</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{task.info.Frequency}</Text>
            </View>

            <Text style={styles.label}>Detalhes</Text>
            <View style={styles.detailsBox}>
              <Text style={styles.details}>{task.info.details}</Text>
            </View>
          </>
        ) : (
          <Text style={styles.description}>Tarefa não encontrada.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (c: Palette) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: c.background },
  content: { width: '100%', maxWidth: 640, alignSelf: 'center', padding: 20, paddingBottom: 28 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  title: { flex: 1, color: c.text, fontSize: 24, fontWeight: '700' },
  description: { color: c.muted, fontSize: 16, lineHeight: 23 },
  label: { color: c.text, fontSize: 16, fontWeight: '700', marginTop: 24, marginBottom: 8 },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: c.primary,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  badgeText: { color: c.onPrimary, fontSize: 14, fontWeight: '700' },
  detailsBox: {
    backgroundColor: c.surface,
    borderColor: c.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
  },
  details: { color: c.text, fontSize: 16, lineHeight: 26 },
});
