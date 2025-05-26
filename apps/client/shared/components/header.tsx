import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedButton, ThemedText } from './themed_components';
import { signOut } from '@/features/authentication/hooks/login';
import { AuthStore } from '@/shared/stores/stores';

export const LoginStatus: React.FC = ({}) => {
  const email =
    AuthStore.storeUIHooks.useValue('email', AuthStore.store_id) || '';

  return (
    <View style={[styles.container]}>
      <ThemedText style={styles.email}>{email}</ThemedText>
      <ThemedButton onPress={signOut} size="small">
        Sign Out
      </ThemedButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  email: {
    opacity: 0.7,
  },
});
