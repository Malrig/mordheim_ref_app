import { Stack } from 'expo-router';

import { Provider } from 'tinybase/ui-react';
import { DataStore } from '../library/stores/data/store';
import { AuthStore } from '../library/stores/auth/store';

export default function RootLayout() {
  return (
    <Provider>
      <AuthStore />
      <DataStore />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack >
    </Provider>
  );
}

