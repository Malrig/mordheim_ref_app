import ItemFilter, { filterItems } from "@/components/items/item_filter";
import { ItemType, WeaponType } from "@/library/types/items";
import { Item as ItemInterface, Armour, MiscItem } from "@/library/types/items";
import React, { useState, useRef, useMemo } from "react";
import { SectionList, Text, View, Pressable, ViewToken, FlatList, StyleSheet } from "react-native";
import { useSetPartialRowCallback, useResultRowIds, useResultTable } from "@/library/tinybase_store/ui";

import FontAwesome from '@expo/vector-icons/FontAwesome';
import ColonText from "@/components/general/colon_text";
import Divider from "@/components/general/divider";
import { Item } from "@/library/tinybase_store/objects/item";
import ItemListItem from "@/components/items/item_list";
import SectionedItemList from "@/components/items/sectioned_item_list";

export default function BrowseItems() {
  const [searchedType, setSearchedType] = useState<ItemType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Get the result table from the query
  const resultTable = useResultTable('filterable_items');

  // Filter items based on search query and type
  const filteredItems = useMemo(() => {
    const items = Object.values(resultTable).map(row => {
      return {
        id: row.id as string,
        name: row.name as string,
        item_type: row.item_type as string,
        weapon_type: row.weapon_type as string,
      }
    });

    // If no filters are applied, return all items
    if (!searchedType && !searchQuery) {
      return items;
    }

    // Filter based on search query and type
    return items.filter(item => {
      const itemName = item.name as string || '';
      const itemType = item.item_type as string || '';

      const matchesSearch = searchQuery === '' ||
        itemName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = !searchedType || itemType === searchedType.toString();

      return matchesSearch && matchesType;
    });
  }, [resultTable, searchQuery, searchedType]);

  // Render each item in the FlatList
  const renderItem = ({ item }: { item: { id: string, name: string, item_type: string } }) => {
    return <ItemListItem item={item} />;
  };

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
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemType: {
    fontSize: 14,
    color: '#666',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  item: {
    flexDirection: 'column',
    borderRadius: 10,
    borderColor: '#000000',
    borderWidth: 1,
    padding: 3,
    margin: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: "center",
  },
  description_text: {
    fontStyle: "italic",
    fontSize: 12,
  }
}); 
