import { StyleSheet } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import { Skill } from "@/library/stores/data/objects/skill";
import React from "react";
import { ThemedText, ThemedView } from "@/components/general/themed_components";
import MarkdownText from "@/components/general/markdown_text";





export function SkillDetail({ skill }: { skill: Skill }) {
  const skillGroup = skill.useSkillGroup();

  return (
    <ThemedView style={styles.container} backgroundColor="primary">
      <ThemedText variant="title">
        {skill.name}{skillGroup ? ` - ${skillGroup.name}` : ""}</ThemedText>
      <MarkdownText text={skill.description} />
    </ThemedView>
  );
}

export default function SkillsDetail() {
  const { id } = useLocalSearchParams();
  const skill = Skill.useInstance(id as string);

  return <SkillDetail skill={skill} />;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  weapon_details_container: {
    flex: 1,
  }
});
