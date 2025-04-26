import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { useThemeColour } from '@/library/stores/user/utils/theme';

interface ThemedViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: 'background' | 'primary' | 'secondary' | 'tertiary';
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