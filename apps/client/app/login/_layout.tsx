import React from 'react';
import { StyleSheet } from 'react-native';
import { Redirect, Slot } from 'expo-router';
import { ThemedText, ThemedView } from '@/shared/components/themed_components';
import { useIsLoggedIn } from '@/features/authentication/hooks/login';

export default function LoginLayout() {
  const { loading: loading, isLoggedIn } = useIsLoggedIn();

  if (loading) {
    return <ThemedText>Loading...</ThemedText>;
  }

  if (isLoggedIn) {
    console.log('Already logged in, redirecting to home page');
    return <Redirect href="/" />;
  }

  return (
    <ThemedView style={styles.container}>
      <Slot />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
