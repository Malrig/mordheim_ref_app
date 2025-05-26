import React from 'react';
import { XStack, YStack } from '@/shared/components/stacks';
import {
  ThemedButton,
  ThemedText,
  ThemedTextInput,
} from '@/shared/components/themed_components';
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

export const SpecialRuleFormPart = ({
  specialRuleIds,
  updateFormField,
  disabled = false,
}: SpecialRuleFormPartProps) => {
  const special_rules = Object.values(
    DataStore.storeUIHooks.useTable(SpecialRule.TABLE_NAME, DataStore.store_id)
  );

  const handleAddSpecialRule = () => {
    // TODO: Implement a proper select/picker component
    // For now, this is a placeholder
    const availableRules = special_rules
      .filter((rule) => !specialRuleIds.includes(rule.id!))
      .map((rule) => rule.name);
    alert('Select a special rule: ' + availableRules.join(', '));
  };

  const handleRemoveSpecialRule = (ruleId: string) => {
    updateFormField(
      'special_rules',
      specialRuleIds.filter((id) => id !== ruleId)
    );
  };

  return (
    <YStack>
      <ThemedText>Special Rules</ThemedText>
      <YStack style={{ gap: 8 }}>
        {specialRuleIds.map((ruleId) => {
          const rule = special_rules.find((r) => r.id === ruleId);
          if (!rule) return null;

          return (
            <XStack key={ruleId} style={{ alignItems: 'center' }}>
              <ThemedTextInput
                value={rule.name}
                editable={false}
                style={{ flex: 1 }}
              />
              <ThemedButton
                onPress={() => handleRemoveSpecialRule(ruleId)}
                disabled={disabled}
                variant="outline"
                size="small"
                style={{ marginLeft: 8 }}
              >
                <FontAwesome name="trash" size={16} />
              </ThemedButton>
            </XStack>
          );
        })}
        <ThemedButton
          onPress={handleAddSpecialRule}
          disabled={disabled}
          variant="outline"
          size="small"
        >
          Add Special Rule
        </ThemedButton>
      </YStack>
    </YStack>
  );
};
