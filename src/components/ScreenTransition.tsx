import { useEffect, useState, type ReactNode } from 'react';
import { Animated, Easing, Platform, StyleSheet } from 'react-native';

type ScreenTransitionProps = {
  children: ReactNode;
  navigation: { addListener: (event: 'focus', callback: () => void) => () => void };
  // 'slide': entra da direita (só no web; no celular o navigator já anima).
  // 'zoom': efeito de "entrar" no card, em todas as plataformas.
  variant?: 'slide' | 'zoom';
};

const DURATION_MS = { slide: 280, zoom: 360 };

export function ScreenTransition({ children, navigation, variant = 'slide' }: ScreenTransitionProps) {
  const [progress] = useState(() => new Animated.Value(1));
  const enabled = variant === 'zoom' || Platform.OS === 'web';

  useEffect(() => {
    if (!enabled) return;
    const play = () => {
      progress.setValue(0);
      Animated.timing(progress, {
        toValue: 1,
        duration: DURATION_MS[variant],
        easing: Easing.out(Easing.cubic),
        useNativeDriver: Platform.OS !== 'web',
      }).start();
    };
    play();
    return navigation.addListener('focus', play);
  }, [enabled, progress, navigation, variant]);

  if (!enabled) return <>{children}</>;

  const opacity = progress.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });
  const transform =
    variant === 'zoom'
      ? [{ scale: progress.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }) }]
      : [{ translateX: progress.interpolate({ inputRange: [0, 1], outputRange: [80, 0] }) }];

  return <Animated.View style={[styles.fill, { opacity, transform }]}>{children}</Animated.View>;
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
