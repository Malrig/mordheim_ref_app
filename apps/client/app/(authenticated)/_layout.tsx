import { Redirect, Stack } from 'expo-router';
import { ReactNode } from "react";
import { useIsLoggedIn } from "@/library/stores/auth/utils/login";
import { allRequiredStoresLoaded } from '@/library/stores/stores';
import { DataStoreProvider } from "@/library/stores/data/store";
import { UserStoreProvider } from "@/library/stores/user/store";
import React from 'react';
import { ThemedText } from '@/components/general/themed_components';
import { ThemedStack } from '@/components/general/themed_components';

function CheckStoresLoaded({ children }: React.PropsWithChildren<{}>) {
  const loaded = allRequiredStoresLoaded();
  console.log(`All stores loaded: ${loaded}`);
  if (!loaded) {
    console.log("Not all stores are loaded");
    return <ThemedText>Loading...</ThemedText>;
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
    return <ThemedText>Loading...</ThemedText>;
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
        <ThemedStack>
          <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
          <Stack.Screen name="items/[id]" options={{
                title: "Item Details",
          }}/>
        </ThemedStack>
      </CheckStoresLoaded>
    </>
  );
}
