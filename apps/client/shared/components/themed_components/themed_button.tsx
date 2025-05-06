import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, StyleProp } from 'react-native';
import { useThemeColour } from '@/features/userstore/hooks/theme';

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
  const backgroundColor = useThemeColour('secondary');
  const textColor = useThemeColour('text');
  const disabledColor = useThemeColour('grey');

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: disabled ? disabledColor : backgroundColor },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, { color: textColor }, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
