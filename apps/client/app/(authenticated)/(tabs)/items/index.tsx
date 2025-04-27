import ItemFilter from "../../../../components/items/item_filter";
import { ItemType } from "@/library/types/enums";
import React, { useState, useMemo } from "react";
import { StyleSheet } from "react-native";
import { ThemedText, ThemedView } from '@/components/general/themed_components'

import { DataStore } from "../../../../library/stores/stores";

import SectionedItemList from "../../../../components/items/sectioned_item_list";
import { DataStoreQueries } from "@/library/stores/data/store";

export default function BrowseItems() {
  const [searchedType, setSearchedType] = useState<ItemType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Get the result table from the query
  const resultTable = DataStore.storeUIHooks.useResultTable('filterable_items', DataStoreQueries());
  console.log(resultTable);

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

  return (
    <ThemedView backgroundColor="primary" style={styles.container}>
      <ThemedText variant="title">All Items</ThemedText>
      <ItemFilter
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        selectedType={searchedType}
        onTypeChange={setSearchedType}
      />
      <SectionedItemList items={filteredItems} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
