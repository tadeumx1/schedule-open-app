import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Router from './routes';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

if (__DEV__) {
  import('./config/ReactotronConfig').then(() =>
    console.log('Reactotron Configured')
  );
}

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

const AppRouter = () => {
  const [loaded] = useFonts({
    RobotoBlack: require('./assets/fonts/Roboto-Black.ttf'),
    RobotoBlackItalic: require('./assets/fonts/Roboto-BlackItalic.ttf'),
    RobotoBold: require('./assets/fonts/Roboto-Bold.ttf'),
    RobotoBoldItalic: require('./assets/fonts/Roboto-BoldItalic.ttf'),
    RobotoItalic: require('./assets/fonts/Roboto-Italic.ttf'),
    RobotoLight: require('./assets/fonts/Roboto-Light.ttf'),
    RobotoLightItalic: require('./assets/fonts/Roboto-LightItalic.ttf'),
    RobotoMedium: require('./assets/fonts/Roboto-Medium.ttf'),
    RobotoMediumItalic: require('./assets/fonts/Roboto-MediumItalic.ttf'),
    Roboto: require('./assets/fonts/Roboto-Regular.ttf'),
    RobotoThin: require('./assets/fonts/Roboto-Thin.ttf'),
    RobotoThinItalic: require('./assets/fonts/Roboto-ThinItalic.ttf'),
  });

  const handleOnLayout = useCallback(async () => {
    if (loaded) {
      await SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={handleOnLayout}>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppRouter;
