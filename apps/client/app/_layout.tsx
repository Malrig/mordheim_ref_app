import React from 'react';
import { Slot } from 'expo-router';
import { Provider } from 'tinybase/ui-react';
import { AuthStoreProvider } from '@/features/authentication/store/store';
import { StrictMode } from 'react';
import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config';
import { DarkTheme } from '@react-navigation/native';
import { DefaultTheme } from '@react-navigation/native';
import { ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <StrictMode>
      <Provider>
        <AuthStoreProvider />
        <TamaguiProvider config={config}>
          <ThemeProvider
            value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
          >
            <Slot />
          </ThemeProvider>
        </TamaguiProvider>
      </Provider>
    </StrictMode>
  );
}
