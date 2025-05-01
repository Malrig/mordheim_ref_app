import { Text, View, FlatList, Pressable, StyleProp, ViewStyle } from "react-native";
import { Link } from 'expo-router';
import * as React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MarkdownText from "./markdown_text";
import { ThemedText, ThemedView } from "./themed_components";

type Props = {
  before: string,
  after: string,
  containerStyle?: StyleProp<ViewStyle>;
  variant?: 'default' | '1-2-4';
}

export default function ColonText({ before, after, containerStyle, variant = "default" }: Props) {
  const left_style = variant === '1-2-4' ? { flex: 1 } : { };
  const right_style = variant === '1-2-4' ? { flex: 4 } : { };
  return (
    <ThemedView style={[{ flexDirection: 'row', alignItems: 'center' }, containerStyle]}>
      <ThemedText variant="important" style={left_style}>{before}: </ThemedText>
      <MarkdownText text={after} container_style={right_style}/>
    </ThemedView>
  );
}

