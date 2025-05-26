import React from 'react';
import {
  Pressable,
  StyleSheet,
  ViewStyle,
  StyleProp,
  PressableProps,
} from 'react-native';
import { useThemeColour } from '@/features/userstore/hooks/theme';
import { ThemedText } from './themed_text';

interface ThemedButtonProps extends PressableProps {
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
}

export const ThemedButton: React.FC<ThemedButtonProps> = ({
  children,
  style,
  disabled = false,
  variant = 'secondary',
  size = 'medium',
  ...props
}) => {
  const backgroundColor = useThemeColour(
    variant === 'outline' ? 'transparent' : variant
  );
  const textColor = useThemeColour('text');
  const borderColor = useThemeColour('secondary');

  const getSize = () => {
    switch (size) {
      case 'small':
        return styles.small;
      case 'large':
        return styles.large;
      default:
        return styles.medium;
    }
  };

  return (
    <Pressable
      {...props}
      disabled={disabled}
      style={[
        styles.button,
        getSize(),
        {
          backgroundColor,
          borderColor: variant === 'outline' ? borderColor : 'transparent',
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {typeof children === 'string' ? (
        <ThemedText style={[styles.text, { color: textColor }]}>
          {children}
        </ThemedText>
      ) : (
        children
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  text: {
    fontWeight: '600',
  },
  small: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  medium: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  large: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});
