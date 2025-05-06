import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { useThemeColour } from '@/features/userstore/hooks/theme';

interface ThemedViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: 'transparent' | 'background' | 'primary' | 'secondary' | 'tertiary';
}

export const ThemedView: React.FC<ThemedViewProps> = ({
  children,
  style,
  backgroundColor = 'transparent',
}) => {
  const bgColor = useThemeColour(backgroundColor);

  return (
    <View style={[{ backgroundColor: bgColor }, style]}>
      {children}
    </View>
  );
};