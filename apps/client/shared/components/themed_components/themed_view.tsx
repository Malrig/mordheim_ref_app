import React from 'react';
import { View } from 'tamagui';
import { StyleProp, ViewStyle } from 'react-native';

interface ThemedViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: 'primary' | 'secondary';
}

export const ThemedView: React.FC<ThemedViewProps> = ({
  children,
  style,
  backgroundColor = 'primary',
}) => {
  return (
    <View
      backgroundColor={
        backgroundColor === 'primary' ? '$background' : '$backgroundHover'
      }
      {...(style as any)}
    >
      {children}
    </View>
  );
};
