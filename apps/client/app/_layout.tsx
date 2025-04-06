import { Stack } from 'expo-router';

import { Provider } from 'tinybase/ui-react';
import { DataStore } from '../library/stores/data/store';

export default function RootLayout() {
  return (
    <Provider>
      <DataStore />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack >
    </Provider>
  );
}

