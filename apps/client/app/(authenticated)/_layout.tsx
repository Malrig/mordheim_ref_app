import {Redirect, Stack} from 'expo-router';
import {Text} from 'react-native';
import {ReactNode} from "react";
import { useIsLoggedIn } from "@/library/stores/auth/utils/login";

export default function RootLayout(): ReactNode {
  const {loading, isLoggedIn} = useIsLoggedIn();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!isLoggedIn) {
    console.log("Not logged in, redirecting to login page");
    return <Redirect href="/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
