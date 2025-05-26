import { ThemedView, ThemedText } from '@/shared/components/themed_components';
import { Link, Stack } from 'expo-router';
import React from 'react';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops! Not Found' }} />
      <ThemedView
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ThemedText variant="subtitle">Page not found</ThemedText>
        <Link href="/">Go back to Home screen!</Link>
      </ThemedView>
    </>
  );
}
