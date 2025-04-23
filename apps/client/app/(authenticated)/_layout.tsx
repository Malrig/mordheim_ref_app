import { Redirect, Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { ReactNode } from "react";
import { useIsLoggedIn } from "@/library/stores/auth/utils/login";
import { allRequiredStoresLoaded } from '@/library/stores/stores';
import { DataStoreProvider } from "@/library/stores/data/store";
import { UserStoreProvider } from "@/library/stores/user/store";
import React from 'react';

function CheckStoresLoaded({ children }: React.PropsWithChildren<{}>) {
  const loaded = allRequiredStoresLoaded();
  console.log(`All stores loaded: ${loaded}`);
  if (!loaded) {
    console.log("Not all stores are loaded");
    return <Text>Loading...</Text>;
  }
  return (
    <>
      {children}
    </>
  );
}

export default function RootLayout(): ReactNode {
  const { loading: loading, isLoggedIn } = useIsLoggedIn();
  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!isLoggedIn) {
    console.log("Not logged in, redirecting to login page");
    return <Redirect href="/login" />;
  }

  return (
    <>
      <DataStoreProvider />
      <UserStoreProvider />
      <CheckStoresLoaded>
        <Stack
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="(tabs)" />
        </Stack>
      </CheckStoresLoaded>
    </>
  );
}
