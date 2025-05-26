import React from 'react';
import { Stack } from 'expo-router';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useThemeColour } from '@/features/userstore/hooks/theme';
import { LoginStatus } from '../header';

interface ThemedStackProps {
  children: React.ReactNode;
  screenOptions?: NativeStackNavigationOptions | undefined; // Options for all screens in the stack
}

export const ThemedStack: React.FC<ThemedStackProps> = ({
  children,
  screenOptions,
}) => {
  const backgroundColor = useThemeColour('tabBarBackground');
  const headerTintColor = useThemeColour('text');

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor },
        headerTintColor,
        headerRight: () => <LoginStatus />,
        ...screenOptions,
      }}
    >
      {children}
    </Stack>
  );
};
