import React from 'react';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useThemeColour } from '@/library/stores/user/utils/theme';
import { ThemedView } from './themed_view';

interface ThemedPickerProps {
  selectedValue: string | number;
  onValueChange: (value: string | number) => void;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

export const ThemedPicker: React.FC<ThemedPickerProps> & {
  Item: typeof Picker.Item;
} = ({
  selectedValue,
  onValueChange,
  style,
  children,
}) => {
    const textColor = useThemeColour('text');
    const backgroundColor = useThemeColour('background');
    const borderColor = useThemeColour('grey');

    return (
      <ThemedView style={[styles.container, { borderColor }, style]}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={[styles.picker, { color: textColor, backgroundColor: backgroundColor }]}
          itemStyle={{ color: textColor }}
        >
          {children}
        </Picker>
      </ThemedView>
    );
  };

ThemedPicker.Item = Picker.Item;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 40,
  },
}); 