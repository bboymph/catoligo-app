import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig?.extra?.apiUrl as string | undefined;

export const env = {
  apiUrl: apiUrl ?? 'http://localhost:3000',
};
