import { Stack } from "expo-router";
import { PortalHost } from "@rn-primitives/portal";
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
  return <>
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top', 'bottom']}>
      <RootContent />
      <PortalHost />
    </SafeAreaView>
  </>
}
