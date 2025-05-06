import React from 'react';
import { Slot } from 'expo-router';
import { Provider } from 'tinybase/ui-react';
import { AuthStoreProvider } from '@/features/authentication/store/store';
import { StrictMode } from 'react';

export default function RootLayout() {
  return (
    <StrictMode>
      <Provider>
        <AuthStoreProvider />
        <Slot />
      </Provider>
    </StrictMode>
  );
}
