import { AppProvider } from "@/providers/app-provider";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import "../../global.css";


const RootContent = () => {

  return <Stack screenOptions={{
    headerShown: false,
    animation: "fade",
    contentStyle: {
      backgroundColor: '#fff'
    }
  }} />
}

export default function RootLayout() {
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
