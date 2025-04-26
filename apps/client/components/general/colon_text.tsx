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
}

export default function ColonText({ before, after, containerStyle }: Props) {
  return (
    <ThemedView style={[{ flexDirection: 'row', alignItems: 'center' }, containerStyle]}>
      <ThemedText variant="important">{before}: </ThemedText>
      <MarkdownText text={after} />
    </ThemedView>
  );
}

