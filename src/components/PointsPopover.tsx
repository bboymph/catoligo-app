import { useEffect, useMemo, useState } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { type Palette } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';

const VISIBLE_MS = 1800;

type Props = {
  message: string | null;
  onHide: () => void;
};

export function PointsPopover({ message, onHide }: Props) {
  const { c } = useTheme();
  const styles = useMemo(() => createStyles(c), [c]);
  const insets = useSafeAreaInsets();
  const [progress] = useState(() => new Animated.Value(0));

  useEffect(() => {
    if (!message) return;
    progress.setValue(0);
    const animation = Animated.sequence([
      Animated.timing(progress, { toValue: 1, duration: 220, useNativeDriver: true }),
      Animated.delay(VISIBLE_MS),
      Animated.timing(progress, { toValue: 0, duration: 220, useNativeDriver: true }),
    ]);
    animation.start(({ finished }) => {
      if (finished) onHide();
    });
    return () => animation.stop();
  }, [message, onHide, progress]);

  if (!message) return null;

  return (
    <Animated.View
      pointerEvents="none"
      accessibilityRole="alert"
      style={[
        styles.popover,
        {
          top: insets.top + 12,
          opacity: progress,
          transform: [
            { translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [-16, 0] }) },
            { scale: progress.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] }) },
          ],
        },
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const createStyles = (c: Palette) =>
  StyleSheet.create({
    popover: {
      position: 'absolute',
      alignSelf: 'center',
      zIndex: 100,
      backgroundColor: c.surface,
      borderColor: c.primary,
      borderWidth: 2,
      borderRadius: 16,
      paddingVertical: 12,
      paddingHorizontal: 22,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: 8,
    },
    text: { color: c.text, fontSize: 16, fontWeight: '700' },
  });
