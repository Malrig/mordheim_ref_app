import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedButton, ThemedText } from './themed_components';
import { useThemeColour } from '@/features/userstore/hooks/theme';
import { signOut } from '@/features/authentication/hooks/login';
import { AuthStore } from '@/shared/stores/stores';

interface LoginStatus { }

export const LoginStatus: React.FC<LoginStatus> = ({}) => {
  const email = AuthStore.storeUIHooks.useValue("email", AuthStore.store_id) || "";

  return (
    <View style={[styles.container]}>
        <ThemedText style={styles.email}>{email}</ThemedText>
        <ThemedButton onPress={signOut} title="Sign Out" style={styles.signOutButton} textStyle={styles.signOutText} />
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
  signOutButton: {
    marginLeft: 10,
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 8,
  },
  signOutText: {
    fontSize: 14,
  },
});