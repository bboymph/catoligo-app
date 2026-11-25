import { useMemo } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import type { Palette } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';

type AlertCardProps = {
  visible: boolean;
  title: string;
  message: string;
  buttonLabel?: string;
  onClose: () => void;
};

export function AlertCard({ visible, title, message, buttonLabel = 'Entendi', onClose }: AlertCardProps) {
  const { c } = useTheme();
  const styles = useMemo(() => createStyles(c), [c]);

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View accessibilityRole="alert" style={styles.card}>
          <View style={styles.iconCircle}>
            <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
              <Circle cx={12} cy={12} r={9} stroke={c.onPrimary} strokeWidth={2} />
              <Path d="M12 7.5v5.5" stroke={c.onPrimary} strokeWidth={2} strokeLinecap="round" />
              <Circle cx={12} cy={16.5} r={1.2} fill={c.onPrimary} />
            </Svg>
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <Pressable
            accessibilityRole="button"
            onPress={onClose}
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          >
            <Text style={styles.buttonText}>{buttonLabel}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const createStyles = (c: Palette) => StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },
  card: {
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    backgroundColor: c.surface,
    borderColor: c.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: c.primary,
    marginBottom: 16,
  },
  title: { color: c.text, fontSize: 20, fontWeight: '700', textAlign: 'center' },
  message: { color: c.muted, fontSize: 15, lineHeight: 22, textAlign: 'center', marginTop: 8 },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: c.primary,
    borderRadius: 24,
    minHeight: 48,
    marginTop: 24,
  },
  buttonText: { color: c.onPrimary, fontSize: 16, fontWeight: '700' },
  pressed: { opacity: 0.8 },
});
