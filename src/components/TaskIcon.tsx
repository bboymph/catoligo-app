import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { TaskItem } from '../data/tasks';
import { useTheme } from '../theme/ThemeContext';

export function TaskIcon({ type }: { type: TaskItem['icon'] }) {
  const { c } = useTheme();
  const stroke = c.tileIcon;
  return (
    <View style={[styles.container, { backgroundColor: c.tile }]}>
      <Svg width={30} height={30} viewBox="0 0 24 24" fill="none">
        {type === 'rosary' && (
          <>
            <Circle cx={12} cy={8} r={5} stroke={stroke} strokeWidth={1.8} strokeDasharray="1.5 2.4" strokeLinecap="round" />
            <Path d="M12 13v8M9 16h6" stroke={stroke} strokeWidth={1.8} strokeLinecap="round" />
          </>
        )}
        {type === 'adoration' && (
          <>
            <Circle cx={12} cy={9} r={3} stroke={stroke} strokeWidth={1.8} />
            <Path d="M12 2v2M12 14v2M5 9h2M17 9h2M7 4l1.5 1.5M17 4l-1.5 1.5M7 14l1.5-1.5M17 14l-1.5-1.5M12 16v3M8 21h8" stroke={stroke} strokeWidth={1.8} strokeLinecap="round" />
          </>
        )}
        {type === 'mass' && (
          <>
            <Path d="M7 4h10c0 5-1.5 7-5 7S7 9 7 4ZM12 11v6M8 21h8M10 17h4" stroke={stroke} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
          </>
        )}
        {type === 'lectio' && (
          <Path d="M12 7c-2-2-5-2.7-9-2v14c4-.7 7 0 9 2m0-14c2-2 5-2.7 9-2v14c-4-.7-7 0-9 2m0-14v14" stroke={stroke} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
        )}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
