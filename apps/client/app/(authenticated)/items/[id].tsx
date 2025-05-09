import { FlatList, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ItemType } from '@/features/datastore/enums';
import { Item } from '@/features/datastore/objects/item';
import React from 'react';
import { ThemedText, ThemedView } from '@/shared/components/themed_components';
import ColonText from '@/shared/components/colon_text';
import MarkdownText from '@/shared/components/markdown_text';
import { Availability } from '@/features/datastore/objects/availability';
import { Expandable } from '@/shared/components/expandable';
import { SpecialRules } from '@/features/datastore/components/special_rules';
import AvailabilityDetails from '@/features/datastore/components/availability_details';

export function ItemDetail({ item: item_to_show }: { item: Item }) {
  const availabilities: Availability[] = item_to_show.useAvailabilities();

  return (
    <ThemedView style={styles.container} backgroundColor="primary">
      <ThemedText variant="title">
        {item_to_show.name} -{' '}
        {item_to_show.item_type === ItemType.Weapon
          ? `${item_to_show.weapon_type} weapon`
          : item_to_show.item_type}
      </ThemedText>
      <MarkdownText text={item_to_show.description} />
      <Expandable title="Availability">
        <ColonText before="Price" after={item_to_show.price} />
        <FlatList
          data={availabilities}
          renderItem={({ item }) => <AvailabilityDetails availability={item} />}
        />
      </Expandable>
      {item_to_show.item_type === ItemType.Weapon && (
        <ThemedView style={styles.weapon_details_container}>
          <ColonText before="Range" after={item_to_show.range} />
          <ColonText before="Strength" after={item_to_show.strength} />
          <SpecialRules specialRules={item_to_show.getSpecialRuleIds()} />
        </ThemedView>
      )}
    </ThemedView>
  );
}

export default function CombinedItemsDetail() {
  const { id } = useLocalSearchParams();
  const item = Item.useInstance(id as string);

  return <ItemDetail item={item} />;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  weapon_details_container: {
    flex: 1,
  },
});
