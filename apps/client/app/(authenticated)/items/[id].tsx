import { FlatList, StyleSheet } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import { ItemType } from "@/features/datastore/enums";
import { Item } from "@/features/datastore/objects/item";
import React from "react";
import { ThemedText, ThemedView } from "@/shared/components/themed_components";
import ColonText from "@/shared/components/colon_text";
import MarkdownText from "@/shared/components/markdown_text";
import { Availability } from "@/features/datastore/objects/availability";
import { Restriction } from "@/features/datastore/objects/restriction";
import { Expandable } from "@/shared/components/expandable";
import { SpecialRules } from "@/features/datastore/components/special_rules";
import AvailabilityDetails from "@/features/datastore/components/availability_details";

export function ItemDetail({ item }: { item: Item }) {
  const availabilities: Availability[] = item.useAvailabilities();

  return (
    <ThemedView style={styles.container} backgroundColor="primary">
      <ThemedText variant="title">
        {item.name} - {item.item_type === ItemType.Weapon ? `${item.weapon_type} weapon` : item.item_type}</ThemedText>
      <MarkdownText text={item.description} />
      <Expandable title="Availability">
        <ColonText before="Price" after={item.price} />
        <FlatList
          data={availabilities}
          renderItem={({ item }) => <AvailabilityDetails availability={item} />}
        />
      </Expandable>
      {item.item_type === ItemType.Weapon && (
        <ThemedView style={styles.weapon_details_container}>
          <ColonText before="Range" after={item.range} />
          <ColonText before="Strength" after={item.strength} />
          <SpecialRules specialRules={item.getSpecialRuleIds()} />
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
  }
});
