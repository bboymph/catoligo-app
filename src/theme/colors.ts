export const colors = {
  primary: '#F8BD2A',
  text: '#1C1C1C',
} as const;

export type Palette = {
  background: string;
  surface: string;
  border: string;
  text: string;
  muted: string;
  subtle: string;
  input: string;
  inputBorder: string;
  placeholder: string;
  accent: string;
  tile: string;
  tileIcon: string;
  doneBackground: string;
  danger: string;
  divider: string;
  pressed: string;
  // Conteúdo sobre o amarelo primário; não muda entre temas.
  onPrimary: string;
  primary: string;
};

export const lightPalette: Palette = {
  background: '#FAF9F6',
  surface: '#FFFFFF',
  border: '#EAE7E0',
  text: '#1C1C1C',
  muted: '#5F5F5F',
  subtle: '#7A7A7A',
  input: '#F2F2F2',
  inputBorder: '#B8B8B8',
  placeholder: '#737373',
  accent: '#805900',
  tile: '#FBEBC0',
  tileIcon: '#7A5200',
  doneBackground: '#E3F4E8',
  danger: '#C62828',
  divider: '#E0DCD2',
  pressed: '#F2F2F2',
  onPrimary: colors.text,
  primary: colors.primary,
};

export const darkPalette: Palette = {
  background: '#121212',
  surface: '#1E1E1E',
  border: '#33312B',
  text: '#F2F2F2',
  muted: '#B3B3B3',
  subtle: '#9A9A9A',
  input: '#2A2A2A',
  inputBorder: '#555555',
  placeholder: '#8C8C8C',
  accent: colors.primary,
  tile: '#3A3118',
  tileIcon: colors.primary,
  doneBackground: '#15301D',
  danger: '#FF8A80',
  divider: '#3A3A3A',
  pressed: '#2A2A2A',
  onPrimary: colors.text,
  primary: colors.primary,
};
