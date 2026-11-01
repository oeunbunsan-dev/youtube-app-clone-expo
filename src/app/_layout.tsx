import { Stack } from "expo-router";

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
    <RootContent />
  </>
}
