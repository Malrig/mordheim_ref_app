import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  YStack,
  Label,
  Select,
  ScrollView,
} from 'tamagui';
import { ItemFormData, useUpsertItemCallback } from '../../hooks/items';
import { ItemType, WeaponType } from '../../enums';
import { SpecialRuleFormPart } from './special_rule_form_part';

interface ItemFormProps {
  initialData?: ItemFormData;
  isEditing?: boolean;
}

export const ItemForm = ({ initialData, isEditing = false }: ItemFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ItemFormData>(
    initialData || {
      id: null,
      name: '',
      description: '',
      price: '',
      item_type: ItemType.MiscItem,
      range: '',
      strength: '',
      special_rules: [],
      weapon_type: null,
      metadata: {
        source: '',
        source_type: '',
      },
    }
  );

  const upsertItemCallback = useUpsertItemCallback();

  const handleSubmit = () => {
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

  // Reset weapon-specific fields when item type changes
  useEffect(() => {
    if (formData.item_type !== ItemType.Weapon) {
      setFormData((prev) => ({
        ...prev,
        range: '',
        strength: '',
        special_rules: [],
        weapon_type: null,
      }));
    }
  }, [formData.item_type]);

  return (
    <ScrollView>
      <Form onSubmit={handleSubmit}>
        <YStack gap="$3" width="100%">
          <YStack>
            <Label>Name</Label>
            <Input
              value={formData.name}
              onChangeText={(text) => updateFormField('name', text)}
              placeholder="Enter item name"
              autoCapitalize="none"
              disabled={isSubmitting}
            />
          </YStack>

          <YStack>
            <Label>Description</Label>
            <Input
              value={formData.description}
              onChangeText={(text) => updateFormField('description', text)}
              placeholder="Enter item description"
              multiline
              numberOfLines={4}
              autoCapitalize="none"
              disabled={isSubmitting}
            />
          </YStack>

          <YStack>
            <Label>Price</Label>
            <Input
              value={formData.price}
              onChangeText={(text) => updateFormField('price', text)}
              placeholder="Enter item price"
              autoCapitalize="none"
              disabled={isSubmitting}
            />
          </YStack>

          <YStack>
            <Label>Item Type</Label>
            <Select
              value={formData.item_type}
              onValueChange={(value) =>
                updateFormField('item_type', value as ItemType)
              }
              native={true}
            >
              <Select.Trigger>
                <Select.Value placeholder="Select an item type" />
              </Select.Trigger>
              <Select.Content>
                <Select.ScrollUpButton />
                <Select.Viewport>
                  <Select.Group>
                    <Select.Label>Item Type</Select.Label>
                    {Object.values(ItemType).map((type, i) => (
                      <Select.Item value={type} key={type} index={i}>
                        <Select.ItemText>{type}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Group>
                </Select.Viewport>
                <Select.ScrollDownButton />
              </Select.Content>
            </Select>
          </YStack>

          {formData.item_type === ItemType.Weapon && (
            <>
              <YStack>
                <Label>Weapon Type</Label>
                <Select
                  value={formData.weapon_type || ''}
                  onValueChange={(value) =>
                    updateFormField('weapon_type', value as WeaponType)
                  }
                  native={true}
                >
                  <Select.Trigger>
                    <Select.Value placeholder="Select a weapon type" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.ScrollUpButton />
                    <Select.Viewport>
                      <Select.Group>
                        <Select.Label>Weapon Type</Select.Label>
                        {Object.values(WeaponType).map((type, i) => (
                          <Select.Item value={type} key={type} index={i}>
                            <Select.ItemText>{type}</Select.ItemText>
                          </Select.Item>
                        ))}
                      </Select.Group>
                    </Select.Viewport>
                    <Select.ScrollDownButton />
                  </Select.Content>
                </Select>
              </YStack>

              <YStack>
                <Label>Range</Label>
                <Input
                  value={formData.range}
                  onChangeText={(text) => updateFormField('range', text)}
                  placeholder="Enter weapon range"
                  autoCapitalize="none"
                  disabled={isSubmitting}
                />
              </YStack>

              <YStack>
                <Label>Strength</Label>
                <Input
                  value={formData.strength}
                  onChangeText={(text) => updateFormField('strength', text)}
                  placeholder="Enter weapon strength"
                  autoCapitalize="none"
                  disabled={isSubmitting}
                />
              </YStack>

              <SpecialRuleFormPart
                specialRuleIds={formData.special_rules}
                updateFormField={updateFormField}
                disabled={isSubmitting}
              />
            </>
          )}

          <Form.Trigger asChild>
            <Button pressStyle={{ opacity: 0.8 }} disabled={isSubmitting}>
              {isSubmitting
                ? isEditing
                  ? 'Saving...'
                  : 'Creating...'
                : isEditing
                  ? 'Save Item'
                  : 'Create Item'}
            </Button>
          </Form.Trigger>
        </YStack>
      </Form>
    </ScrollView>
  );
};
