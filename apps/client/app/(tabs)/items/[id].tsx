import { Text, View, StyleSheet } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import { ItemType } from "@/library/types/items";
import { Item } from "@/library/tinybase_store/objects/item";
import React from "react";

export function ItemDetail({ item }: { item: Item }) {
  return (
    <View style={styles.detailContainer}>
      <Text style={styles.detailTitle}>{item.name}</Text>
      <Text style={styles.detailDescription}>{item.description}</Text>
      <View style={styles.detailInfo}>
        <Text style={styles.detailText}>Price: {item.price}</Text>
        {/* <Text style={styles.detailText}>Availability: {item.availability.map(avail =>
          avail.restrictions.length > 0 ? 'Restricted' : 'Common'
        ).join(', ')}</Text> */}
        {item.item_type === ItemType.Weapon && (
          <>
            <Text style={styles.detailText}>Range: {item.range}</Text>
            <Text style={styles.detailText}>Strength: {item.strength}</Text>
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
