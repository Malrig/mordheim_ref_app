import React from 'react';
import { YStack, Label, Select, Button, XStack } from 'tamagui';
import { DataStore } from '../../store/interface';
import { SpecialRule } from '../../objects/special_rule';
import { FontAwesome } from '@expo/vector-icons';
import { ItemFormData } from '../../hooks/items';

interface SpecialRuleFormPartProps {
  specialRuleIds: string[];
  updateFormField: <K extends keyof ItemFormData>(
    field: K,
    value: ItemFormData[K]
  ) => void;
  disabled?: boolean;
}

export const SpecialRuleFormPart: React.FC<SpecialRuleFormPartProps> = ({
  specialRuleIds,
  updateFormField,
  disabled = false,
}) => {
  const special_rules = Object.values(
    DataStore.storeUIHooks.useTable(SpecialRule.TABLE_NAME, DataStore.store_id)
  );

  const addSpecialRule = () => {
    updateFormField('special_rules', [...specialRuleIds, '']);
  };

  const removeSpecialRule = (index: number) => {
    const newRules = [...specialRuleIds];
    newRules.splice(index, 1);
    updateFormField('special_rules', newRules);
  };

  const updateSpecialRule = (index: number, value: string) => {
    const newRules = [...specialRuleIds];
    newRules[index] = value;
    updateFormField('special_rules', newRules);
  };

  return (
    <YStack gap="$2">
      <XStack alignItems="center" justifyContent="space-between">
        <Label>Special Rules</Label>
        <Button
          icon={<FontAwesome name="plus" />}
          onPress={addSpecialRule}
          disabled={disabled}
          size="$2"
        >
          Add Rule
        </Button>
      </XStack>
      {specialRuleIds.map((ruleId, index) => (
        <XStack key={index} gap="$2" alignItems="center">
          <YStack flex={1}>
            <Select
              value={ruleId}
              onValueChange={(value) => updateSpecialRule(index, value)}
              native={true}
            >
              <Select.Trigger>
                <Select.Value placeholder="Select a special rule" />
              </Select.Trigger>
              <Select.Content>
                <Select.ScrollUpButton />
                <Select.Viewport>
                  <Select.Group>
                    <Select.Label>Special Rules</Select.Label>
                    {special_rules.map(
                      (rule, i) =>
                        rule.id && (
                          <Select.Item value={rule.id} key={rule.id} index={i}>
                            <Select.ItemText>{rule.name}</Select.ItemText>
                          </Select.Item>
                        )
                    )}
                  </Select.Group>
                </Select.Viewport>
                <Select.ScrollDownButton />
              </Select.Content>
            </Select>
          </YStack>
          <Button
            icon={<FontAwesome name="minus" />}
            onPress={() => removeSpecialRule(index)}
            disabled={disabled}
            size="$2"
            theme="red"
          />
        </XStack>
      ))}
    </YStack>
  );
};
