import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { loadSettings, saveSettings } from '../storage/settings';
import { darkPalette, lightPalette, type Palette } from './colors';

type ThemeState = {
  isDark: boolean;
  c: Palette;
  setDark: (value: boolean) => void;
};

const ThemeContext = createContext<ThemeState | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadSettings().then((settings) => {
      setIsDark(settings.darkTheme);
      setLoaded(true);
    });
  }, []);

  const setDark = useCallback((value: boolean) => {
    setIsDark(value);
    saveSettings({ darkTheme: value });
  }, []);

  const value = useMemo(() => ({ isDark, c: isDark ? darkPalette : lightPalette, setDark }), [isDark, setDark]);

  // Evita piscar o tema claro antes de carregar a preferência salva.
  if (!loaded) return null;

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  }
  return context;
}
