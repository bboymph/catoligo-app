import { Image, StyleSheet, View } from 'react-native';

export function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        accessibilityLabel="catoliGO"
        source={require('../../assets/catoligo-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1C1C1C' },
  logo: { width: 200, height: 200 },
});
