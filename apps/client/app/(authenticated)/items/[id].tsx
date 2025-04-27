import { FlatList, StyleSheet } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import { ItemType } from "@/library/types/enums";
import { Item } from "@/library/stores/data/objects/item";
import React from "react";
import { ThemedText, ThemedView } from "@/components/general/themed_components";
import ColonText from "@/components/general/colon_text";
import MarkdownText from "@/components/general/markdown_text";
import { Availability } from "@/library/stores/data/objects/availability";
import { Restriction } from "@/library/stores/data/objects/restriction";
import { Expandable } from "@/components/general/expandable";
import { SpecialRules } from "@/components/data/special_rules";

function RestrictionDetails({ restriction }: { restriction: Restriction }) {
  return (
    <ThemedView>
      <ColonText before={restriction.restriction_type} after={restriction.restriction} />
    </ThemedView>
  );
}

function AvailabilityDetails({ availability }: { availability: Availability }) {
  const restrictions = availability.useRestrictions();

  return (
    <ThemedView>
      <ColonText before="Rarity" after={availability.rarity ? String(availability.rarity) : 'Common'} />
      <FlatList
        data={restrictions}
        renderItem={({ item }) => <RestrictionDetails restriction={item} />}
      />
    </ThemedView>
  );
}

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
