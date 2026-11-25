import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';

import { CHECK_ANIMATION_MS, CheckButton } from '../components/CheckButton';
import { PointsPopover } from '../components/PointsPopover';
import { TaskIcon } from '../components/TaskIcon';
import { POINTS_PER_TASK, useTasks } from '../context/TasksContext';
import { tasks, type TaskItem } from '../data/tasks';
import { colors, type Palette } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';

const DONE_GREEN = '#2E9E4F';

export function TasksScreen() {
  const { c } = useTheme();
  const styles = useMemo(() => createStyles(c), [c]);
  const { myTaskIds, doneIds, addTask, toggleDone, removeTask: removeFromMine } = useTasks();
  const [menuId, setMenuId] = useState<string | null>(null);
  const [section, setSection] = useState<'list' | 'mine'>('list');
  const [completingId, setCompletingId] = useState<string | null>(null);
  const [popoverMessage, setPopoverMessage] = useState<string | null>(null);
  const router = useRouter();

  const availableTasks = tasks.filter((task) => !myTaskIds.includes(task.id));
  const myTasks = myTaskIds
    .map((id) => tasks.find((task) => task.id === id))
    .filter((task): task is TaskItem => task !== undefined);

  const removeTask = (id: string) => {
    removeFromMine(id);
    setMenuId(null);
  };

  const handleCheck = (id: string, done: boolean) => {
    if (completingId) return;
    if (done) {
      toggleDone(id);
      return;
    }
    setCompletingId(id);
    setTimeout(() => {
      toggleDone(id);
      setCompletingId(null);
      setPopoverMessage(`Você ganhou ${POINTS_PER_TASK} pontos`);
    }, CHECK_ANIMATION_MS);
  };

  const hidePopover = useCallback(() => setPopoverMessage(null), []);

  const doneTasks = myTasks.filter((task) => doneIds.includes(task.id));
  const pendingTasks = myTasks.filter((task) => !doneIds.includes(task.id));

  const renderTaskBody = (item: TaskItem) => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Ver detalhes de ${item.title}`}
      onPress={() => {
        setMenuId(null);
        router.push({ pathname: '/task/[id]', params: { id: item.id } });
      }}
      style={({ pressed }) => [styles.cardBody, pressed && styles.pressed]}
    >
      <TaskIcon type={item.icon} />
      <View style={styles.info}>
        <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
      </View>
    </Pressable>
  );

  const renderMyTask = (item: TaskItem) => {
    const done = doneIds.includes(item.id);
    return (
      <View key={item.id} style={[styles.card, styles.myCard, done && styles.cardDone, menuId === item.id && styles.cardRaised]}>
        {renderTaskBody(item)}
        <CheckButton
          done={done || completingId === item.id}
          idleColor={c.input}
          idleStroke={c.text}
          doneColor={DONE_GREEN}
          label={done ? `Desmarcar ${item.title}` : `Concluir ${item.title}`}
          onPress={() => handleCheck(item.id, done)}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Mais opções de ${item.title}`}
          onPress={() => setMenuId(menuId === item.id ? null : item.id)}
          hitSlop={8}
          style={styles.moreButton}
        >
          <Svg width={18} height={18} viewBox="0 0 24 24">
            <Circle cx={12} cy={5} r={2} fill={c.muted} />
            <Circle cx={12} cy={12} r={2} fill={c.muted} />
            <Circle cx={12} cy={19} r={2} fill={c.muted} />
          </Svg>
        </Pressable>
        {menuId === item.id ? (
          <View style={styles.menu}>
            <Pressable
              accessibilityRole="menuitem"
              accessibilityLabel={`Excluir ${item.title}`}
              onPress={() => removeTask(item.id)}
              style={({ pressed }) => [styles.menuItem, pressed && styles.pressed]}
            >
              <Text style={styles.menuText}>Excluir</Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <View style={styles.tabBar} accessibilityRole="tablist">
        {([
          ['list', 'Lista de Tarefas'],
          ['mine', `Minhas Tarefas${myTasks.length ? ` (${myTasks.length})` : ''}`],
        ] as const).map(([key, label]) => (
          <Pressable
            key={key}
            accessibilityRole="tab"
            accessibilityState={{ selected: section === key }}
            onPress={() => {
              setSection(key);
              setMenuId(null);
            }}
            style={[styles.tab, section === key && styles.tabActive]}
          >
            <Text style={[styles.tabText, section === key && styles.tabTextActive]}>{label}</Text>
          </Pressable>
        ))}
      </View>
      <ScrollView contentContainerStyle={styles.content} onScrollBeginDrag={() => setMenuId(null)}>
        {section === 'list' ? (
          availableTasks.length === 0 ? (
          <Text style={styles.empty}>Todas as tarefas já foram adicionadas.</Text>
        ) : (
          availableTasks.map((item) => (
            <View key={item.id} style={styles.card}>
              {renderTaskBody(item)}
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Adicionar ${item.title}`}
                onPress={() => addTask(item.id)}
                style={({ pressed }) => [styles.roundButton, styles.addButton, pressed && styles.pressed]}
              >
                <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
                  <Path d="M12 5v14M5 12h14" stroke={colors.text} strokeWidth={2.4} strokeLinecap="round" />
                </Svg>
              </Pressable>
            </View>
          ))
          )
        ) : myTasks.length === 0 ? (
          <Text style={styles.empty}>Toque em + na Lista de Tarefas para adicionar tarefas aqui.</Text>
        ) : (
          <>
            {pendingTasks.length > 0 ? (
              <>
                {doneTasks.length > 0 ? <Text style={styles.sectionTitle}>Pendentes</Text> : null}
                {pendingTasks.map(renderMyTask)}
              </>
            ) : null}
            {doneTasks.length > 0 ? (
              <>
                <Text style={[styles.sectionTitle, pendingTasks.length > 0 && styles.sectionSpacing]}>Concluídas</Text>
                {doneTasks.map(renderMyTask)}
              </>
            ) : null}
          </>
        )}
      </ScrollView>
      <PointsPopover message={popoverMessage} onHide={hidePopover} />
    </SafeAreaView>
  );
}

const createStyles = (c: Palette) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: c.background },
  content: { width: '100%', maxWidth: 640, alignSelf: 'center', padding: 20, paddingBottom: 28 },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: c.surface,
    borderBottomColor: c.border,
    borderBottomWidth: 1,
  },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 14, borderBottomWidth: 3, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: c.primary },
  tabText: { color: c.muted, fontSize: 15, fontWeight: '600' },
  tabTextActive: { color: c.text, fontWeight: '700' },
  sectionTitle: { color: c.text, fontSize: 18, fontWeight: '700', marginBottom: 12 },
  sectionSpacing: { marginTop: 16 },
  empty: { color: c.muted, fontSize: 14, marginBottom: 12 },
  card: {
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
  myCard: { paddingTop: 22 },
  cardDone: { backgroundColor: c.doneBackground, borderColor: DONE_GREEN },
  cardRaised: { zIndex: 10 },
  info: { flex: 1 },
  cardBody: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  cardTitle: { color: c.text, fontSize: 16, fontWeight: '700', lineHeight: 21 },
  description: { color: c.muted, fontSize: 14, lineHeight: 19, marginTop: 2 },
  roundButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: { backgroundColor: c.primary },
  checkIdle: { backgroundColor: c.input },
  checkDone: { backgroundColor: DONE_GREEN },
  moreButton: { position: 'absolute', top: 4, right: 6, padding: 2 },
  menu: {
    position: 'absolute',
    top: 28,
    right: 8,
    backgroundColor: c.surface,
    borderRadius: 8,
    borderColor: c.border,
    borderWidth: 1,
    minWidth: 110,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  menuItem: { paddingVertical: 10, paddingHorizontal: 14 },
  menuText: { color: c.danger, fontSize: 15, fontWeight: '600' },
  pressed: { opacity: 0.8 },
});
