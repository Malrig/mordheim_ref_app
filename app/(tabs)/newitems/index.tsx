import ItemListItem from "@/components/items/list_item";
import WeaponListItem from "@/components/weapons/list_item";
import { selectAllItems, selectItemsStatus, selectItemsError } from "@/library/store/features/itemsSlice";
import { useAppSelector } from "@/library/store/hooks";
import { ItemType } from "@/library/types/items";
import { NewItem, NewArmour, NewMiscItem } from "@/library/types/new_items";
import React, { useState, useRef } from "react";
import { SectionList, Text, View, Pressable, ViewToken, FlatList, StyleSheet } from "react-native";



type Section = {
  title: string;
  data: NewItem[];
  type: ItemType;
};

export default function BrowseItems() {
  const items = useAppSelector(selectAllItems);
  const status = useAppSelector(selectItemsStatus);
  const error = useAppSelector(selectItemsError);
  const [selectedType, setSelectedType] = useState<ItemType | null>(null);
  const sectionListRef = useRef<SectionList<NewItem, Section>>(null);

  const sections: Section[] = [
    {
      title: "Weapons",
      data: items.filter(item => item.item_type === ItemType.Weapon),
      type: ItemType.Weapon
    },
    {
      title: "Armour",
      data: items.filter(item => item.item_type === ItemType.Armour),
      type: ItemType.Armour
    },
    {
      title: "Miscellaneous Items",
      data: items.filter(item => item.item_type === ItemType.MiscItem),
      type: ItemType.MiscItem
    }
  ];

  const renderItem = ({ item }: { item: NewItem }) => {
    switch (item.item_type) {
      case ItemType.Weapon:
        return <WeaponListItem weapon={item} />;
      case ItemType.Armour:
        return <ItemListItem item={item as NewArmour} />;
      case ItemType.MiscItem:
        return <ItemListItem item={item as NewMiscItem} />;
      default:
        return <Text>Unknown item type</Text>;
    }
  };

  const renderSectionHeader = ({ section: { title } }: { section: Section }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

  const onItemTypeSelect = React.useCallback((item: Section) => {
    setSelectedType(item.type);
    sectionListRef?.current?.scrollToLocation({
      sectionIndex: sections.findIndex(s => s.type === item.type),
      itemIndex: 1,
      animated: true
    });
  }, []);

  const renderTypeItem = ({ item }: { item: Section }) => (
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

  if (status === 'pending') {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const onCheckViewableItems = ({ viewableItems, changed }: { viewableItems: ViewToken<NewItem>[], changed: ViewToken<NewItem>[] }) => {
    if (viewableItems.length > 0) {
      setSelectedType(viewableItems[0].section.type);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Items</Text>
      <View style={styles.typeListContainer}>
        <FlatList
          horizontal
          data={sections}
          renderItem={renderTypeItem}
          keyExtractor={(item) => item.type.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.typeListContent}
        />
      </View>
      <View style={styles.sectionListContainer}>
        <SectionList<NewItem, Section>
          ref={sectionListRef}
          sections={sections}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          onViewableItemsChanged={onCheckViewableItems}
          keyExtractor={(item) => item.id}
          stickySectionHeadersEnabled={true}
        />
      </View>
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
    marginTop: 8,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 
