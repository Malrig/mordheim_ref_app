import { Text, View, FlatList, Pressable } from "react-native";
import { Link } from 'expo-router';
import * as React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MarkdownText from "./markdown_text";
import { ThemedText } from "./themed_components";

type Props = {
  before: string,
  after: string,
}

export default function ColonText({ before, after }: Props) {
  return (
    <ThemedText style={{ flexDirection: 'row', }}>
      <ThemedText style={{ fontWeight: "bold" }}>{before}: </ThemedText>
      <MarkdownText text={after} />
    </ThemedText>
  );
}

