import React from 'react';
import { Text } from 'tamagui';
import { StyleProp, TextStyle } from 'react-native';

interface ThemedTextProps {
  children: React.ReactNode;
  variant?: 'body' | 'title' | 'subtitle' | 'important';
  style?: StyleProp<TextStyle>;
}

export const ThemedText: React.FC<ThemedTextProps> = ({
  children,
  variant = 'body',
  style,
}) => {
  const getSize = () => {
    switch (variant) {
      case 'title':
        return '$8';
      case 'subtitle':
        return '$6';
      case 'important':
        return '$5';
      default:
        return '$4';
    }
  };

  const getWeight = () => {
    switch (variant) {
      case 'title':
        return '700';
      case 'subtitle':
      case 'important':
        return '600';
      default:
        return '400';
    }
  };

  return (
    <Text size={getSize()} fontWeight={getWeight()} {...(style as any)}>
      {children}
    </Text>
  );
};
