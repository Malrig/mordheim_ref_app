import React from 'react';
import { Text, StyleSheet, TextStyle, StyleProp } from 'react-native';
import { useThemeColour } from '@/features/userstore/hooks/theme';

interface ThemedTextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  variant?: 'body' | 'title' | 'subtitle' | 'important';
}

export const ThemedText: React.FC<ThemedTextProps> = ({
  children,
  style,
  variant = 'body',
}) => {
  const textColor = useThemeColour('text');

  return (
    <Text style={[styles[variant], { color: textColor }, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  body: {
    fontSize: 16,
    lineHeight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
  },
  important: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
});
