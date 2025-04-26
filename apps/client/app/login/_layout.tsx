import React from 'react';
import { StyleSheet } from 'react-native';
import { Slot } from 'expo-router';
import { ThemedView } from '@/components/general/themed_components';

export default function LoginLayout() {
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
