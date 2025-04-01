import ItemFilter, { filterItems } from "@/components/items/item_filter";
import ItemListItem from "@/components/items/sectioned_item_list";
import OtherItemListItem from "@/components/items/other_items/list_item";
import WeaponListItem from "@/components/items/weapons/list_item";
import { selectAllItems, selectItemsStatus, selectItemsError } from "@/library/store/features/itemsSlice";
import { useAppSelector } from "@/library/store/hooks";
import { ItemType, WeaponType } from "@/library/types/items";
import { Item, Armour, MiscItem } from "@/library/types/items";
import React, { useState, useRef, useMemo } from "react";
import { SectionList, Text, View, Pressable, ViewToken, FlatList, StyleSheet } from "react-native";
import SectionedItemList from "@/components/items/sectioned_item_list";

type Section = {
  title: string;
  data: Item[];
  type: ItemType;
};

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
