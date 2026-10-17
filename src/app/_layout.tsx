if (typeof globalThis.requestAnimationFrame === 'undefined') {
  globalThis.requestAnimationFrame = (callback: FrameRequestCallback) => {
    return setTimeout(callback, 1000 / 60) as unknown as number;
  };
  globalThis.cancelAnimationFrame = (handle?: number | null) => {
    if (handle) clearTimeout(handle);
  };
}

import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import '../global.css';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { PaperThemes } from '@/constants/theme';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, fontError] = useFonts({
    'BubblegumSans-Regular': require('../../assets/fonts/BubblegumSans-Regular.ttf'),
    'CaveatBrush-Regular': require('../../assets/fonts/CaveatBrush-Regular.ttf'),
    'Gaegu-Light': require('../../assets/fonts/Gaegu-Light.ttf'),
    'Gaegu-Regular': require('../../assets/fonts/Gaegu-Regular.ttf'),
    'Gaegu-Bold': require('../../assets/fonts/Gaegu-Bold.ttf'),
    'Gluten-Regular': require('../../assets/fonts/Gluten-Regular.ttf'),
    'PlaypenSans-Regular': require('../../assets/fonts/PlaypenSans-Regular.ttf'),
    'Schoolbell-Regular': require('../../assets/fonts/Schoolbell-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const paperTheme = colorScheme === 'dark' ? PaperThemes.dark : PaperThemes.light;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <PaperProvider theme={paperTheme}>
        <AnimatedSplashOverlay />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/interests" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/profile" options={{ headerShown: false }} />
        </Stack>
      </PaperProvider>
    </ThemeProvider>
  );
}
