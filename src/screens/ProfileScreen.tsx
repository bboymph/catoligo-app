import * as ImagePicker from 'expo-image-picker';
import { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';

import { POINTS_PER_TASK, useTasks } from '../context/TasksContext';
import { colors, type Palette } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';

const AVATAR_SIZE = 120;

export function ProfileScreen() {
  const { c } = useTheme();
  const styles = useMemo(() => createStyles(c), [c]);
  const { doneIds, points } = useTasks();
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  async function changeImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  }

  async function inviteFriends() {
    try {
      await Share.share({ message: 'Venha rezar comigo! Conheça o catoliGO, o app para acompanhar sua vida de fé.' });
    } catch {
      // Compartilhamento cancelado ou indisponível no dispositivo.
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.avatar}>
          {avatarUri ? (
            <Image accessibilityLabel="Foto do usuário" source={{ uri: avatarUri }} style={styles.avatarImage} />
          ) : (
            <Svg width={64} height={64} viewBox="0 0 24 24" fill="none">
              <Circle cx={12} cy={8} r={4} stroke="#9A9A9A" strokeWidth={1.6} />
              <Path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" stroke="#9A9A9A" strokeWidth={1.6} strokeLinecap="round" />
            </Svg>
          )}
        </View>
        <Pressable accessibilityRole="button" onPress={changeImage} hitSlop={8}>
          <Text style={styles.changeImage}>Alterar Imagem</Text>
        </Pressable>

        <View style={styles.divider} />

        <View style={styles.cardsRow}>
          <View style={[styles.card, styles.pointsCard]}>
            <Text style={styles.pointsLabel}>Pontos de hoje</Text>
            <Text accessibilityLabel={`${points} pontos`} style={styles.pointsValue}>{points}</Text>
            <Text style={styles.pointsHint}>
              {doneIds.length} {doneIds.length === 1 ? 'tarefa concluída' : 'tarefas concluídas'}
            </Text>
            <Text style={styles.pointsHint}>{POINTS_PER_TASK} pontos por tarefa</Text>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Convidar amigos"
            onPress={inviteFriends}
            style={({ pressed }) => [styles.card, styles.inviteCard, pressed && styles.pressed]}
          >
            <Svg width={40} height={40} viewBox="0 0 24 24" fill="none">
              <Circle cx={9} cy={8} r={3.5} stroke={colors.text} strokeWidth={1.8} />
              <Path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" stroke={colors.text} strokeWidth={1.8} strokeLinecap="round" />
              <Path d="M19 8v6M16 11h6" stroke={colors.text} strokeWidth={1.8} strokeLinecap="round" />
            </Svg>
            <Text style={styles.inviteText}>Convidar amigos</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (c: Palette) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: c.background },
  content: { width: '100%', maxWidth: 640, alignSelf: 'center', alignItems: 'center', padding: 24 },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: c.input,
    borderColor: c.primary,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: { width: '100%', height: '100%' },
  changeImage: { color: c.accent, fontSize: 16, fontWeight: '600', marginTop: 12 },
  divider: { alignSelf: 'stretch', height: 1, backgroundColor: c.divider, marginTop: 24 },
  cardsRow: { alignSelf: 'stretch', flexDirection: 'row', gap: 12, marginTop: 24 },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    padding: 16,
    minHeight: 150,
  },
  pointsCard: { backgroundColor: c.surface, borderColor: c.border, borderWidth: 1 },
  inviteCard: { backgroundColor: c.primary, gap: 10 },
  inviteText: { color: c.onPrimary, fontSize: 16, fontWeight: '700', textAlign: 'center' },
  pressed: { opacity: 0.85 },
  pointsLabel: { color: c.muted, fontSize: 15, fontWeight: '600' },
  pointsValue: { color: c.text, fontSize: 44, fontWeight: '800', marginVertical: 4 },
  pointsHint: { color: c.muted, fontSize: 13, textAlign: 'center' },
});
