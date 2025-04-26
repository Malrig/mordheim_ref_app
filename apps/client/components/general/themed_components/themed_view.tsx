import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useThemeColour } from '@/library/stores/user/utils/theme';

interface ThemedViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  backgroundColor?: 'primary' | 'secondary' | 'tertiary';
}

export const ThemedView: React.FC<ThemedViewProps> = ({
  children,
  style,
  backgroundColor = 'primary',
}) => {
  const bgColor = useThemeColour(backgroundColor);

  return (
    <View style={[{ backgroundColor: bgColor }, style]}>
      {children}
    </View>
  );
};