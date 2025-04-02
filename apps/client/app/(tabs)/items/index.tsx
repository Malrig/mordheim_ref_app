import ItemFilter, { filterItems } from "@/components/items/item_filter";
import { selectAllItems } from "@/library/store/features/itemsSlice";
import { useAppSelector } from "@/library/store/hooks";
import { ItemType } from "@/library/types/items";
import React, { useState, useMemo } from "react";
import { Text, View, StyleSheet } from "react-native";
import SectionedItemList from "@/components/items/sectioned_item_list";

export default function BrowseItems() {
  const items = useAppSelector(selectAllItems);
  const [searchedType, setSearchedType] = useState<ItemType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter items based on search query and type
  const filteredItems = useMemo(() => {
    return filterItems(items, searchQuery, searchedType);
  }, [items, searchQuery, searchedType]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Items</Text>
      <ItemFilter
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        selectedType={searchedType}
        onTypeChange={setSearchedType}
      />
      <SectionedItemList items={filteredItems} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
}); 
