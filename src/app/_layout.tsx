import { FONT_MAP } from "@/constants/fonts";
import { AppProvider } from "@/providers/app-provider";
import { useAppSettings } from "@/providers/app-settings-provider";
import { PortalHost } from "@rn-primitives/portal";
import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";


// Prevent splash screen from auto-hiding while resources load
SplashScreen.preventAutoHideAsync().catch(() => { });


const RootContent = () => {
  const { theme, isReady } = useAppSettings();

  if (!isReady) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  };

  return <Stack screenOptions={{
    headerShown: false,
    animation: "fade",
    contentStyle: {
      backgroundColor: '#fff'
    }
  }} />
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F172A',
  },
});

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(FONT_MAP);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().catch(() => { });
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top', 'bottom']}>
        <AppProvider>
          <RootContent />
          <PortalHost />
        </AppProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
