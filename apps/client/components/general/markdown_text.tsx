import { Text, View, FlatList, Pressable, TextInput, StyleSheet } from "react-native";
import { Link } from 'expo-router';
import * as React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Markdown, { RenderRules } from '@ronradtke/react-native-markdown-display';
import { useThemeColour } from "@/library/stores/user/utils/theme";
// import { Divider, List } from "react-native-paper";

type Props = {
  text: string,
}

// If we need to override the default markdown rendering then this is how it's done.
// TODO: Custom link renderer so that any internal links (e.g. to items or rules) can be rendered as
//       buttons which open up a modal or something similar.
const rules: RenderRules = {
  // heading1: (node, children, parent, styles) =>
  //   <Text key={node.key} style={[styles.heading, styles.heading1]}>
  //      H1 TEXT HERE "{children}"
  //   </Text>,
}

const MarkdownWrapper: React.FC<any> = ({ children }) => {
  const styles = StyleSheet.create({
    body: {
      color: useThemeColour('text'),
      fontSize: 10
    },
  });

  // TODO: Update the styles to match the theme
  return <Markdown style={styles} rules={rules}>{children}</Markdown>;
};

export default function MarkdownText({ text }: Props) {
  return (
    <>
      <MarkdownWrapper>{text}</MarkdownWrapper>
    </>
  );
}
