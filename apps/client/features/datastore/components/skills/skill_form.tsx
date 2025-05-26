import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { YStack } from '@/shared/components/stacks';
import {
  ThemedButton,
  ThemedText,
  ThemedTextInput,
} from '@/shared/components/themed_components';
import { SkillFormData, useUpsertSkillCallback } from '../../hooks/skills';
import { DataStore } from '../../store/interface';
import { SkillGroup } from '../../objects/skill_group';

interface SkillFormProps {
  initialData?: SkillFormData;
  isEditing?: boolean;
}

export const SkillForm = ({
  initialData,
  isEditing = false,
}: SkillFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<SkillFormData>(
    initialData || {
      id: null,
      name: '',
      description: '',
      group_id: '',
      metadata: {
        source: '',
        source_type: '',
      },
    }
  );
  const upsertSkillCallback = useUpsertSkillCallback();
  const skill_groups = Object.values(
    DataStore.storeUIHooks.useTable(SkillGroup.TABLE_NAME, DataStore.store_id)
  );

  const handleSubmit = () => {
    setError(null);
    setIsSubmitting(true);

    upsertSkillCallback(formData);
    setIsSubmitting(false);
  };

  const updateFormField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <ScrollView>
      <View style={{ width: '100%', padding: 16 }}>
        <YStack style={{ gap: 12 }}>
          <YStack>
            <ThemedText>Name</ThemedText>
            <ThemedTextInput
              value={formData.name}
              onChangeText={(text) => updateFormField('name', text)}
              placeholder="Enter skill name"
              autoCapitalize="none"
              editable={!isSubmitting}
            />
          </YStack>

          <YStack>
            <ThemedText>Description</ThemedText>
            <ThemedTextInput
              value={formData.description}
              onChangeText={(text) => updateFormField('description', text)}
              placeholder="Enter skill description"
              multiline
              numberOfLines={4}
              autoCapitalize="none"
              editable={!isSubmitting}
            />
          </YStack>

          <YStack>
            <ThemedText>Skill Group</ThemedText>
            <ThemedTextInput
              value={
                skill_groups.find((group) => group.id === formData.group_id)
                  ?.name || ''
              }
              onPressIn={() => {
                // TODO: Implement a proper select/picker component
                // For now, this is a placeholder
                const groupNames = skill_groups.map((group) => group.name);
                alert('Select a skill group: ' + groupNames.join(', '));
              }}
              placeholder="Select a skill group"
              editable={false}
            />
          </YStack>

          {error && (
            <ThemedText style={{ color: 'red', textAlign: 'center' }}>
              {error}
            </ThemedText>
          )}

          <ThemedButton
            onPress={handleSubmit}
            disabled={isSubmitting}
            size="large"
          >
            {isSubmitting
              ? isEditing
                ? 'Saving...'
                : 'Creating...'
              : isEditing
                ? 'Save Skill'
                : 'Create Skill'}
          </ThemedButton>
        </YStack>
      </View>
    </ScrollView>
  );
};
