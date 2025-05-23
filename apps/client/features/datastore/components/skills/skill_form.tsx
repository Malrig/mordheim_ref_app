import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  YStack,
  Text,
  Label,
  Select,
  ScrollView,
} from 'tamagui';
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
      <Form onSubmit={handleSubmit}>
        <YStack gap="$3" width="100%" padding="$4">
          <YStack>
            <Label>Name</Label>
            <Input
              value={formData.name}
              onChangeText={(text) => updateFormField('name', text)}
              placeholder="Enter skill name"
              autoCapitalize="none"
              disabled={isSubmitting}
            />
          </YStack>

          <YStack>
            <Label>Description</Label>
            <Input
              value={formData.description}
              onChangeText={(text) => updateFormField('description', text)}
              placeholder="Enter skill description"
              multiline
              numberOfLines={4}
              autoCapitalize="none"
              disabled={isSubmitting}
            />
          </YStack>

          <YStack>
            <Label>Skill Group</Label>
            <Select
              value={formData.group_id}
              onValueChange={(value) => updateFormField('group_id', value)}
              native={true}
            >
              <Select.Trigger>
                <Select.Value placeholder="Select a skill group" />
              </Select.Trigger>
              <Select.Content>
                <Select.ScrollUpButton />
                <Select.Viewport>
                  <Select.Group>
                    <Select.Label>Skill Group</Select.Label>
                    {skill_groups.map(
                      (group, i) =>
                        group.id && (
                          <Select.Item
                            value={group.id}
                            key={group.id}
                            index={i}
                          >
                            <Select.ItemText>{group.name}</Select.ItemText>
                          </Select.Item>
                        )
                    )}
                  </Select.Group>
                </Select.Viewport>
                <Select.ScrollDownButton />
              </Select.Content>
            </Select>
          </YStack>

          {error && (
            <Text color="$red10" textAlign="center">
              {error}
            </Text>
          )}

          <Form.Trigger asChild>
            <Button pressStyle={{ opacity: 0.8 }} disabled={isSubmitting}>
              {isSubmitting
                ? isEditing
                  ? 'Saving...'
                  : 'Creating...'
                : isEditing
                  ? 'Save Skill'
                  : 'Create Item'}
            </Button>
          </Form.Trigger>
        </YStack>
      </Form>
    </ScrollView>
  );
};
