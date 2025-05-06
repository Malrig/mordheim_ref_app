import { Redirect, Stack } from 'expo-router';
import { ReactNode } from "react";
import { useIsLoggedIn } from "@/features/authentication/hooks/login";
import { allRequiredStoresLoaded } from '@/shared/stores/stores';
import { DataStoreProvider } from "@/features/datastore/store/store";
import { UserStoreProvider } from "@/features/userstore/store/store";
import React from 'react';
import { ThemedText } from '@/shared/components/themed_components';
import { ThemedStack } from '@/shared/components/themed_components';

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
          <Stack.Screen name="skills/[id]" options={{
                title: "Skill Details",
          }}/>
        </ThemedStack>
      </CheckStoresLoaded>
    </>
  );
}
