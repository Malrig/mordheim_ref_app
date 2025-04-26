import React from 'react';
import { TextInput, StyleSheet, TextStyle, StyleProp } from 'react-native';
import { useThemeColour } from '@/library/stores/user/utils/theme';

interface ThemedTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export const ThemedTextInput: React.FC<ThemedTextInputProps> = ({
  value,
  onChangeText,
  placeholder,
  style,
  textStyle,
  secureTextEntry = false,
  multiline = false,
  numberOfLines,
  autoCapitalize = 'none',
}) => {
  const backgroundColor = useThemeColour('background');
  const textColor = useThemeColour('text');
  const borderColor = useThemeColour('grey');
  const placeholderColor = useThemeColour('grey');

  return (
    <TextInput
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
      secureTextEntry={secureTextEntry}
      placeholderTextColor={placeholderColor}
      multiline={multiline}
      numberOfLines={numberOfLines}
      autoCapitalize={autoCapitalize}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
}); 
