import React from 'react';
import { FlatList, Text, StyleSheet, ViewStyle, TextStyle, StyleProp } from 'react-native';
import { useThemeColour } from '@/library/stores/user/utils/theme';
import { Ids } from 'tinybase/with-schemas';
import { SpecialRule } from '@/library/stores/data/objects/special_rule';
import { ThemedView, ThemedText } from '@/components/general/themed_components';
import ColonText from '@/components/general/colon_text';

interface ThemedButtonProps {
  specialRules: Ids | SpecialRule[]
}

export const SpecialRules: React.FC<ThemedButtonProps> = ({
  specialRules,
}) => {
  if (!specialRules || specialRules.length === 0) {
    return null;
  }

  const safeSpecialRules = typeof specialRules[0] === 'string' ?
    (specialRules as string[]).map((id) => SpecialRule.useInstance(id)) :
    specialRules as SpecialRule[];

  return (
    <ThemedView style={{ flex: 1}}>
      <ThemedText variant="subtitle">Special Rules:</ThemedText>
      <FlatList
        data={safeSpecialRules}
        renderItem={({ item: rule }) => (
          <>
            <ColonText before={rule.name} after={rule.description} variant='1-2-4'/>
          </>
        )}
      />
    </ThemedView>
  );
};
