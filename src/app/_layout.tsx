import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { useColorScheme } from '@/components/useColorScheme';
import BookingProvider from '@/providers/BookingProvider';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '/sign-in',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    PoppinsBlack: require('../../assets/fonts/Poppins-Black.ttf'),
    PoppinsBlackItalic: require('../../assets/fonts/Poppins-BlackItalic.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
    PoppinsBoldItalic: require('../../assets/fonts/Poppins-BoldItalic.ttf'),
    PoppinsExtraBold: require('../../assets/fonts/Poppins-ExtraBold.ttf'),
    PoppinsExtraBoldItalic: require('../../assets/fonts/Poppins-ExtraBoldItalic.ttf'),
    PoppinsExtraLight: require('../../assets/fonts/Poppins-ExtraLight.ttf'),
    PoppinsExtraLightItalic: require('../../assets/fonts/Poppins-ExtraLightItalic.ttf'),
    PoppinsItalic: require('../../assets/fonts/Poppins-Italic.ttf'),
    PoppinsLight: require('../../assets/fonts/Poppins-Light.ttf'),
    PoppinsLightItalic: require('../../assets/fonts/Poppins-LightItalic.ttf'),
    PoppinsMedium: require('../../assets/fonts/Poppins-Medium.ttf'),
    PoppinsMediumItalic: require('../../assets/fonts/Poppins-MediumItalic.ttf'),
    PoppinsRegular: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsSemiBold: require('../../assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsSemiBoldItalic: require('../../assets/fonts/Poppins-SemiBoldItalic.ttf'),
    PoppinsThin: require('../../assets/fonts/Poppins-Thin.ttf'),
    PoppinsThinItalic: require('../../assets/fonts/Poppins-ThinItalic.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <BookingProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="MyAccountModal" options={{ presentation: 'modal' }} />
          <Stack.Screen name="TicketScreen" options={{ presentation: 'modal' }} />
        </Stack>
      </BookingProvider>
    </ThemeProvider>
  );
}
