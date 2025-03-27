import { Item } from "@/library/types/items";
import { Text, View, StyleSheet, FlatList, SectionList, Pressable, ViewToken } from "react-native";
import * as React from 'react';
import { ItemType } from "@/library/types/items";
import { useState } from "react";
import ItemListItem from "./item_list";

interface ItemSection {
  title: string;
  data: Item[];
  type: ItemType;
};

type Props = {
  itemSections: ItemSection[]
}

export default function SectionedItemList({ itemSections }: Props) {
  const [selectedType, setSelectedType] = useState<ItemType | null>(null);
  const sectionListRef = React.useRef<SectionList<Item, ItemSection>>(null);

  const renderTypeItem = ({ item }: { item: ItemSection }) => (
    <Pressable
      style={[
        styles.typeItem,
        selectedType === item.type && styles.selectedTypeItem
      ]}
      onPress={() => onItemTypeSelect(item)}
    >
      <Text style={[
        styles.typeItemText,
        selectedType === item.type && styles.selectedTypeItemText
      ]}>
        {item.title}
      </Text>
    </Pressable>
  );

  const renderSectionHeader = ({ section: { title } }: { section: ItemSection }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

  const onItemTypeSelect = React.useCallback((item: ItemSection) => {
    setSelectedType(item.type);
    sectionListRef?.current?.scrollToLocation({
      sectionIndex: itemSections.findIndex(s => s.type === item.type),
      itemIndex: 1,
      animated: true
    });
  }, [itemSections]);

  const onCheckViewableItems = ({ viewableItems, changed }: { viewableItems: ViewToken<Item>[], changed: ViewToken<Item>[] }) => {
    if (viewableItems.length > 0) {
      setSelectedType(viewableItems[0].section.type);
    }
  }

  return (<View style={styles.container}>
    <Text style={styles.title}>All Items</Text>
    <View style={styles.typeListContainer}>
      <FlatList
        horizontal
        data={itemSections}
        renderItem={renderTypeItem}
        keyExtractor={(item) => item.type.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.typeListContent}
      />
    </View>
    <View style={styles.sectionListContainer}>
      <SectionList<Item, ItemSection>
        ref={sectionListRef}
        sections={itemSections}
        renderItem={({ item }: { item: Item }) => <ItemListItem item={item} />}
        renderSectionHeader={renderSectionHeader}
        onViewableItemsChanged={onCheckViewableItems}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={true}
      />
    </View>
  </View>)
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
