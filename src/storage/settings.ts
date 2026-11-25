import AsyncStorage from '@react-native-async-storage/async-storage';

const SETTINGS_KEY = '@catoligo/settings';

export type Settings = {
  darkTheme: boolean;
};

export const defaultSettings: Settings = { darkTheme: false };

export async function loadSettings(): Promise<Settings> {
  try {
    const raw = await AsyncStorage.getItem(SETTINGS_KEY);
    if (!raw) return defaultSettings;
    return { ...defaultSettings, ...JSON.parse(raw) };
  } catch {
    return defaultSettings;
  }
}

export async function saveSettings(settings: Settings): Promise<void> {
  try {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // Falha ao salvar não deve interromper o uso do app.
  }
}
