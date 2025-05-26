import React from 'react';
import { Ids } from 'tinybase/with-schemas';
import { SpecialRule } from '@/features/datastore/objects/special_rule';
import { ThemedView, ThemedText } from '@/shared/components/themed_components';
import ColonText from '@/shared/components/colon_text';

interface ThemedButtonProps {
  specialRules: Ids;
}

export const SpecialRules: React.FC<ThemedButtonProps> = ({ specialRules }) => {
  if (!specialRules || specialRules.length === 0) {
    return null;
  }

  const safeSpecialRules = specialRules.map((id) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    SpecialRule.useInstance(id)
  );

  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedText variant="subtitle">Special Rules:</ThemedText>
      {safeSpecialRules.map((rule) => (
        <ColonText
          key={rule.id}
          before={rule.name}
          after={rule.description}
          variant="1-2-4"
        />
      ))}
      {/* <FlatList
        data={safeSpecialRules}
        renderItem={({ item: rule }) => (
          <>
            <ColonText
              before={rule.name}
              after={rule.description}
              variant="1-2-4"
            />
          </>
        )}
      /> */}
    </ThemedView>
  );
};
