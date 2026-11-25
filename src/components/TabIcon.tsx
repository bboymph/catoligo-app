import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { colors } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';

type TabIconProps = {
  name: 'home' | 'tasks' | 'events' | 'bible';
  size: number;
  focused: boolean;
};

const paths: Record<TabIconProps['name'], string> = {
  home: 'M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5M9 21v-7h6v7',
  tasks: 'M9 6h12M9 12h12M9 18h12M3 6l1 1 2-2M3 12l1 1 2-2M3 18l1 1 2-2',
  events: 'M4 5h16v16H4zM8 3v4M16 3v4M4 10h16M8 14h2M14 14h2M8 18h2',
  bible: 'M12 6c-2-2-5-3-9-2v15c4-1 7 0 9 2m0-15c2-2 5-3 9-2v15c-4-1-7 0-9 2m0-15v15M16.5 7v5M14.5 9h4',
};

export function TabIcon({ name, size, focused }: TabIconProps) {
  const { c } = useTheme();
  return (
    <View style={[styles.container, focused && styles.active]}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d={paths[name]} stroke={focused ? colors.text : c.muted} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: 44, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 15 },
  active: { backgroundColor: colors.primary },
});
