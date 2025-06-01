import * as Font from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import '../global.css';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Exo2-Regular': require('../assets/fonts/Exo2-Regular.ttf'),
        'Exo2-SemiBold': require('../assets/fonts/Exo2-SemiBold.ttf'),
        'Exo2-Italic': require('../assets/fonts/Exo2-Italic.ttf')
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  (Text as any).defaultProps = (Text as any).defaultProps || {};
  (Text as any).defaultProps.style = {fontFamily: 'Exo2-Regular'};

  return (
    <View style={{flex: 1}} onLayout={onLayoutRootView}>
      <Stack screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </View>
  );
}
