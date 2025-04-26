import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedButton, ThemedText } from './themed_components';
import { useThemeColour } from '@/library/stores/user/utils/theme';
import { signOut } from '@/library/stores/auth/utils/login';
import { AuthStore } from '@/library/stores/stores';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const backgroundColor = useThemeColour('tabBarBackground');
  const email = AuthStore.storeUIHooks.useValue("email", AuthStore.store_id) || "";

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ThemedText variant="title">{title}</ThemedText>
      <View style={styles.rightSection}>
        <ThemedText style={styles.email}>{email}</ThemedText>
        <ThemedButton onPress={signOut} title="Sign Out" style={styles.signOutButton} textStyle={styles.signOutText} />
      </View>


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
    // fontWeight: 'bold',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}); 