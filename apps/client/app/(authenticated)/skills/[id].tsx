import { StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Skill } from '@/features/datastore/objects/skill';
import React, { useState } from 'react';
import {
  ThemedText,
  ThemedView,
  ThemedButton,
  ThemedModal,
} from '@/shared/components/themed_components';
import MarkdownText from '@/shared/components/markdown_text';
import { ScrollView } from 'react-native';
import { YStack } from '@/shared/components/stacks';
import { SkillForm } from '@/features/datastore/components/skills/skill_form';

export function SkillDetail({ skill }: { skill: Skill }) {
  const skillGroup = skill.useSkillGroup();
  const metadata = skill.useMetadata();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView>
      <YStack style={{ gap: 12, padding: 16 }}>
        <ThemedText variant="title">
          {skill.name}
          {skillGroup ? ` - ${skillGroup.name}` : ''}
        </ThemedText>
        <MarkdownText text={skill.description} />

        <ThemedButton onPress={() => setModalVisible(true)}>Edit</ThemedButton>

        <ThemedModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          title="Edit Skill"
        >
          <SkillForm
            initialData={{
              id: skill.id,
              name: skill.name,
              description: skill.description,
              group_id: skill.group_id,
              metadata: {
                source: metadata?.source || '',
                source_type: metadata?.source_type || '',
              },
            }}
            isEditing={true}
          />
        </ThemedModal>
      </YStack>
    </ScrollView>
  );
}

export default function SkillsDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const skill = Skill.useInstance(id);

  return (
    <ThemedView style={styles.container} backgroundColor="primary">
      <SkillDetail skill={skill} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
