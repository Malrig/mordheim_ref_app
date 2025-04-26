import { View, StyleSheet } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import { ItemType } from "../../../library/types/items";
import { Item } from "../../../library/stores/data/objects/item";
import React from "react";
import { ThemedText } from "@/components/general/themed_components";

export function ItemDetail({ item }: { item: Item }) {
  return (
    <View style={styles.detailContainer}>
      <ThemedText style={styles.detailTitle}>{item.name}</ThemedText>
      <ThemedText style={styles.detailDescription}>{item.description}</ThemedText>
      <View style={styles.detailInfo}>
        <ThemedText style={styles.detailText}>Price: {item.price}</ThemedText>
        {/* <Text style={styles.detailText}>Availability: {item.availability.map(avail =>
          avail.restrictions.length > 0 ? 'Restricted' : 'Common'
        ).join(', ')}</Text> */}
        {item.item_type === ItemType.Weapon && (
          <>
            <ThemedText style={styles.detailText}>Range: {item.range}</ThemedText>
            <ThemedText style={styles.detailText}>Strength: {item.strength}</ThemedText>
          </>
        )}
      </View>
    </View>
  );
}


export default function CombinedItemsDetail() {
  const { id } = useLocalSearchParams();
  const item = Item.useInstance(id as string);

  return <ItemDetail item={item} />;
}
const styles = StyleSheet.create({
  detailContainer: {
    flex: 1,
    padding: 16,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detailDescription: {
    fontSize: 16,
    marginBottom: 24,
  },
  detailInfo: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
  },
});
