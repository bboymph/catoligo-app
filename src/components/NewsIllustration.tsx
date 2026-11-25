import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { NewsItem } from '../data/news';

const backgrounds: Record<NewsItem['illustration'], string> = {
  church: '#EEDAB2',
  community: '#D8E5D3',
  bible: '#EAD6C2',
  care: '#D5E4E1',
};

type NewsIllustrationProps = {
  type: NewsItem['illustration'];
  compact?: boolean;
};

export function NewsIllustration({ type, compact = false }: NewsIllustrationProps) {
  return (
    <View style={[styles.container, compact && styles.compact, { backgroundColor: backgrounds[type] }]}>
      <Svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio={compact ? 'xMidYMid slice' : 'xMidYMid meet'} accessibilityRole="image" accessibilityLabel="Ilustração da notícia">
        <Circle cx="320" cy="65" r="32" fill="#F8BD2A" opacity={0.75} />
        <Path d="M0 245 Q100 205 200 245 T400 235 V300 H0Z" fill="#FFFFFF" opacity={0.4} />
        {type === 'church' && (
          <>
            <Path d="M105 235V125l95-65 95 65v110Z" fill="#FAF7F0" />
            <Path d="M90 128 200 52l110 76" fill="none" stroke="#9D6C46" strokeWidth="10" strokeLinejoin="round" />
            <Path d="M200 25v40M187 38h26" stroke="#9D6C46" strokeWidth="7" strokeLinecap="round" />
            <Path d="M180 235v-45a20 20 0 0 1 40 0v45Z" fill="#9D6C46" />
            <Circle cx="200" cy="125" r="17" fill="#F8BD2A" />
          </>
        )}
        {type === 'community' && (
          <>
            <Circle cx="200" cy="105" r="30" fill="#B7744F" />
            <Circle cx="130" cy="128" r="24" fill="#D09C74" />
            <Circle cx="270" cy="128" r="24" fill="#906449" />
            <Path d="M150 225c0-48 20-76 50-76s50 28 50 76Z" fill="#E4A830" />
            <Path d="M85 225c0-39 17-62 45-62 14 0 25 6 33 17-8 13-13 28-13 45Zm165 0c0-17-5-32-13-45 8-11 19-17 33-17 28 0 45 23 45 62Z" fill="#6F9478" />
          </>
        )}
        {type === 'bible' && (
          <>
            <Path d="M200 215c-30-24-68-30-115-20V90c47-10 85-4 115 20 30-24 68-30 115-20v105c-47-10-85-4-115 20Z" fill="#FFFCF5" stroke="#A57855" strokeWidth="6" strokeLinejoin="round" />
            <Path d="M200 110v105M235 125h45M235 143h45M120 125h45M120 143h45" stroke="#C9AA87" strokeWidth="5" strokeLinecap="round" />
            <Path d="M200 50v38M188 63h24" stroke="#A57855" strokeWidth="7" strokeLinecap="round" />
          </>
        )}
        {type === 'care' && (
          <>
            <Circle cx="200" cy="155" r="78" fill="#85B5A1" />
            <Path d="M146 118c23 4 25 21 41 22 15 1 23-19 35-18 17 1 15 20 29 24l21 6M138 166c15-5 24-2 32 9 10 14 14 32 29 37M220 207c-7-17 0-34 15-38 12-4 20 3 35-2" fill="none" stroke="#E8F0D8" strokeWidth="16" strokeLinecap="round" />
            <Rect x="195" y="52" width="10" height="27" rx="5" fill="#779370" />
            <Path d="M200 55c-16-1-24-11-24-24 16 0 24 10 24 24Zm0 0c16-1 24-11 24-24-16 0-24 10-24 24Z" fill="#779370" />
          </>
        )}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 4 / 3,
    overflow: 'hidden',
  },
  compact: {
    width: 50,
    height: 50,
    aspectRatio: 1,
    borderRadius: 8,
  },
});
