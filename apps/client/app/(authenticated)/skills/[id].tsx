import { StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Skill } from '@/features/datastore/objects/skill';
import React from 'react';
import { ThemedText, ThemedView } from '@/shared/components/themed_components';
import MarkdownText from '@/shared/components/markdown_text';
import { Dialog, Button, YStack, ScrollView, Unspaced } from 'tamagui';
import { SkillForm } from '@/features/datastore/components/skills/skill_form';

export function SkillDetail({ skill }: { skill: Skill }) {
  const skillGroup = skill.useSkillGroup();
  const metadata = skill.useMetadata();

  return (
    <ScrollView>
      <YStack gap="$3" padding="$4">
        <ThemedText variant="title">
          {skill.name}
          {skillGroup ? ` - ${skillGroup.name}` : ''}
        </ThemedText>
        <MarkdownText text={skill.description} />

        <Dialog modal>
          <Dialog.Trigger asChild>
            <Button>Edit</Button>
          </Dialog.Trigger>

          {/* <Adapt when="maxMd" platform="touch">
            <Sheet zIndex={200000} modal dismissOnSnapToBottom>
              <Sheet.Frame padding="$4" gap="$4">
                <Adapt.Contents />
              </Sheet.Frame>
              <Sheet.Overlay
                backgroundColor="$shadow6"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
              />
            </Sheet>
          </Adapt> */}

          <Dialog.Portal>
            <Dialog.Overlay
              key="overlay"
              opacity={0.5}
              onPress={(e) => {
                e.preventDefault();
                (e.target as any)?.dispatchEvent?.(
                  new Event('dismiss', { bubbles: true })
                );
              }}
            />

            <Dialog.Content
              bordered
              key="content"
              padding="$4"
              gap="$4"
              elevate
              width={400}
              maxWidth="95%"
              maxHeight="95%"
            >
              <Dialog.Title>Edit Skill</Dialog.Title>
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
              <Unspaced>
                <Dialog.Close asChild>
                  <Button position="absolute" right="$3" size="$2" circular>
                    ✕
                  </Button>
                </Dialog.Close>
              </Unspaced>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>
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
