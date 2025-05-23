import React from 'react';
import { Button, Text } from 'tamagui';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

interface ThemedButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

export const ThemedButton: React.FC<ThemedButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
}) => {
  return (
    <Button
      onPress={onPress}
      disabled={disabled}
      opacity={disabled ? 0.5 : 1}
      size="$4"
      {...(style as any)}
    >
      <Text {...(textStyle as any)}>{title}</Text>
    </Button>
  );
};
