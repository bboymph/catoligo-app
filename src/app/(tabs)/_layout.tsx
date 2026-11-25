import { Tabs } from 'expo-router';

import { AppHeader } from '../../components/AppHeader';
import { ScreenTransition } from '../../components/ScreenTransition';
import { TabIcon } from '../../components/TabIcon';
import { useTheme } from '../../theme/ThemeContext';

export default function TabsLayout() {
  const { c } = useTheme();
  return (
    <Tabs
      backBehavior="history"
      screenLayout={({ children, navigation }) => (
        <ScreenTransition navigation={navigation}>{children}</ScreenTransition>
      )}
      screenOptions={{
        animation: 'shift',
        header: () => <AppHeader />,
        tabBarActiveTintColor: c.accent,
        tabBarInactiveTintColor: c.muted,
        tabBarStyle: { borderTopColor: c.border, backgroundColor: c.surface },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Início',
          tabBarIcon: ({ size, focused }) => <TabIcon name="home" size={size} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tarefas',
          tabBarIcon: ({ size, focused }) => <TabIcon name="tasks" size={size} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Eventos',
          tabBarIcon: ({ size, focused }) => <TabIcon name="events" size={size} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="bible"
        options={{
          title: 'Bíblia',
          tabBarIcon: ({ size, focused }) => <TabIcon name="bible" size={size} focused={focused} />,
        }}
      />
    </Tabs>
  );
}
