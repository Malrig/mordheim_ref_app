import ItemFilter, { filterItems } from "@/components/items/item_filter";
import ItemListItem from "@/components/items/sectioned_item_list";
import OtherItemListItem from "@/components/items/other_items/list_item";
import WeaponListItem from "@/components/items/weapons/list_item";
import { selectAllItems, selectItemsStatus, selectItemsError } from "@/library/store/features/itemsSlice";
import { useAppSelector } from "@/library/store/hooks";
import { ItemType } from "@/library/types/items";
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

  const sections: Section[] = [
    {
      title: "Weapons",
      data: filteredItems.filter(item => item.item_type === ItemType.Weapon),
      type: ItemType.Weapon
    },
    {
      title: "Armour",
      data: filteredItems.filter(item => item.item_type === ItemType.Armour),
      type: ItemType.Armour
    },
    {
      title: "Miscellaneous Items",
      data: filteredItems.filter(item => item.item_type === ItemType.MiscItem),
      type: ItemType.MiscItem
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Items</Text>
      <ItemFilter
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        selectedType={searchedType}
        onTypeChange={setSearchedType}
      />
      <SectionedItemList itemSections={sections} />
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
  typeListContainer: {
    height: 50,
    marginBottom: 16,
  },
  typeListContent: {
    paddingVertical: 8,
  },
  typeItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  selectedTypeItem: {
    backgroundColor: '#007AFF',
  },
  typeItemText: {
    fontSize: 16,
    color: '#000',
  },
  selectedTypeItemText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionListContainer: {
    flex: 1,
  },
  sectionHeader: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginTop: 0,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 
