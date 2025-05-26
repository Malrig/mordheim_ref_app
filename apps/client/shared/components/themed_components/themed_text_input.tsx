import React from 'react';
import {
  TextInput,
  StyleSheet,
  TextStyle,
  StyleProp,
  TextInputProps,
} from 'react-native';
import { useThemeColour } from '@/features/userstore/hooks/theme';

interface ThemedTextInputProps extends TextInputProps {
  style?: StyleProp<TextStyle>;
}

export const ThemedTextInput: React.FC<ThemedTextInputProps> = ({
  value,
  onChangeText,
  placeholder,
  style,
  ...props
}) => {
  const backgroundColor = useThemeColour('primary');
  const textColor = useThemeColour('text');
  const borderColor = useThemeColour('grey');
  const placeholderColor = useThemeColour('grey');

  return (
    <TextInput
      {...props}
      style={[
        styles.input,
        {
          backgroundColor,
          color: textColor,
          borderColor,
        },
        style,
      ]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={placeholderColor}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    width: '100%',
  },
});
