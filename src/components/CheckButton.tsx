import { useEffect, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export const CHECK_ANIMATION_MS = 350;

type Props = {
  done: boolean;
  idleColor: string;
  idleStroke: string;
  doneColor: string;
  label: string;
  onPress: () => void;
};

export function CheckButton({ done, idleColor, idleStroke, doneColor, label, onPress }: Props) {
  const [progress] = useState(() => new Animated.Value(done ? 1 : 0));

  useEffect(() => {
    Animated.timing(progress, {
      toValue: done ? 1 : 0,
      duration: CHECK_ANIMATION_MS,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
  }, [done, progress]);

  const backgroundColor = progress.interpolate({ inputRange: [0, 1], outputRange: [idleColor, doneColor] });
  const idleOpacity = progress.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });

  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ selected: done }} onPress={onPress}>
      <Animated.View style={[styles.button, { backgroundColor }]}>
        <Animated.View style={[styles.icon, { opacity: idleOpacity }]}>
          <CheckIcon stroke={idleStroke} />
        </Animated.View>
        <Animated.View style={[styles.icon, { opacity: progress }]}>
          <CheckIcon stroke="#FFFFFF" />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

function CheckIcon({ stroke }: { stroke: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M5 12.5l4.5 4.5L19 7.5" stroke={stroke} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  button: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  icon: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, alignItems: 'center', justifyContent: 'center' },
});
