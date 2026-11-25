import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { AppHeader } from '../components/AppHeader';
import { ScreenTransition } from '../components/ScreenTransition';
import { TasksProvider } from '../context/TasksContext';
import { ThemeProvider } from '../theme/ThemeContext';

// Rotas abertas ao tocar em um card; recebem o zoom-in em vez do slide.
const CARD_ROUTES = ['task/[id]', 'news/[id]'];

export default function RootLayout() {
  return (
    <ThemeProvider>
      <TasksProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
          screenLayout={({ children, navigation, route }) => (
            <ScreenTransition
              navigation={navigation}
              variant={CARD_ROUTES.includes(route.name) ? 'zoom' : 'slide'}
            >
              {children}
            </ScreenTransition>
          )}
        >
          <Stack.Screen name="task/[id]" options={{ headerShown: true, animation: 'fade', header: () => <AppHeader alwaysShowBack /> }} />
          <Stack.Screen name="news/[id]" options={{ headerShown: true, animation: 'fade', header: () => <AppHeader alwaysShowBack /> }} />
          <Stack.Screen name="profile" options={{ headerShown: true, header: () => <AppHeader alwaysShowBack /> }} />
          <Stack.Screen name="settings" options={{ headerShown: true, header: () => <AppHeader alwaysShowBack /> }} />
        </Stack>
      </TasksProvider>
    </ThemeProvider>
  );
}
