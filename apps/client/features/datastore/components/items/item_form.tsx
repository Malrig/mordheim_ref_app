import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { ItemFormData, useUpsertItemCallback } from '../../hooks/items';
import { ItemType, WeaponType } from '../../enums';
import { SpecialRuleFormPart } from './special_rule_form_part';
import { YStack } from '@/shared/components/stacks';
import {
  ThemedButton,
  ThemedText,
  ThemedTextInput,
} from '@/shared/components/themed_components';

interface ItemFormProps {
  initialData?: ItemFormData;
  isEditing?: boolean;
}

export const ItemForm = ({ initialData, isEditing = false }: ItemFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ItemFormData>(
    initialData || {
      id: null,
      name: '',
      description: '',
      price: '',
      item_type: ItemType.MiscItem,
      weapon_type: null,
      range: '',
      strength: '',
      special_rules: [],
      metadata: {
        source: '',
        source_type: '',
      },
    }
  );

  const upsertItemCallback = useUpsertItemCallback();

  const handleSubmit = () => {
    setError(null);
    setIsSubmitting(true);

    upsertItemCallback(formData);
    setIsSubmitting(false);
  };

  const updateFormField = <K extends keyof ItemFormData>(
    field: K,
    value: ItemFormData[K]
  ) => {
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
              placeholder="Enter item name"
              autoCapitalize="none"
              editable={!isSubmitting}
            />
          </YStack>

          <YStack>
            <ThemedText>Description</ThemedText>
            <ThemedTextInput
              value={formData.description}
              onChangeText={(text) => updateFormField('description', text)}
              placeholder="Enter item description"
              multiline
              numberOfLines={4}
              autoCapitalize="none"
              editable={!isSubmitting}
            />
          </YStack>

          <YStack>
            <ThemedText>Price</ThemedText>
            <ThemedTextInput
              value={formData.price}
              onChangeText={(text) => updateFormField('price', text)}
              placeholder="Enter item price"
              autoCapitalize="none"
              editable={!isSubmitting}
            />
          </YStack>

          <YStack>
            <ThemedText>Item Type</ThemedText>
            <ThemedTextInput
              value={formData.item_type}
              onPressIn={() => {
                // TODO: Implement a proper select/picker component
                // For now, this is a placeholder
                const types = Object.values(ItemType);
                alert('Select an item type: ' + types.join(', '));
              }}
              placeholder="Select an item type"
              editable={false}
            />
          </YStack>

          {formData.item_type === ItemType.Weapon && (
            <>
              <YStack>
                <ThemedText>Weapon Type</ThemedText>
                <ThemedTextInput
                  value={formData.weapon_type || ''}
                  onPressIn={() => {
                    // TODO: Implement a proper select/picker component
                    // For now, this is a placeholder
                    const types = Object.values(WeaponType);
                    alert('Select a weapon type: ' + types.join(', '));
                  }}
                  placeholder="Select a weapon type"
                  editable={false}
                />
              </YStack>

              <YStack>
                <ThemedText>Range</ThemedText>
                <ThemedTextInput
                  value={formData.range}
                  onChangeText={(text) => updateFormField('range', text)}
                  placeholder="Enter weapon range"
                  autoCapitalize="none"
                  editable={!isSubmitting}
                />
              </YStack>

              <YStack>
                <ThemedText>Strength</ThemedText>
                <ThemedTextInput
                  value={formData.strength}
                  onChangeText={(text) => updateFormField('strength', text)}
                  placeholder="Enter weapon strength"
                  autoCapitalize="none"
                  editable={!isSubmitting}
                />
              </YStack>

              <SpecialRuleFormPart
                specialRuleIds={formData.special_rules}
                updateFormField={updateFormField}
                disabled={isSubmitting}
              />
            </>
          )}

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
                ? 'Save Item'
                : 'Create Item'}
          </ThemedButton>
        </YStack>
      </View>
    </ScrollView>
  );
};
