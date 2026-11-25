import { useEffect, useState } from 'react';

import { LoginScreen } from '../screens/LoginScreen';
import { SplashScreen } from '../screens/SplashScreen';

const SPLASH_DURATION_MS = 1800;

export default function Index() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  return ready ? <LoginScreen /> : <SplashScreen />;
}
