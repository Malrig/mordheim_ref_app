import { Item, WeaponType } from "@/library/types/items";
import { Text, View, StyleSheet, FlatList, SectionList, Pressable, ViewToken, SectionListData } from "react-native";
import * as React from 'react';
import { ItemType } from "@/library/types/items";
import { useState } from "react";
import ItemListItem from "./item_list";

interface SectionKey {
  item_type: ItemType;
  weapon_type: WeaponType | null;
}

interface ItemSection {
  title: string;
  data: Item[];
  sectionKey: SectionKey;
};

function getSectionKey(key: SectionKey) {
  return `${key.item_type}-${key.weapon_type}`;
}

type Props = {
  items: Item[]
}

export default function SectionedItemList({ items }: Props) {
  const [currentSection, setCurrentSection] = useState<SectionKey | null>(null);
  const sectionListRef = React.useRef<SectionList<Item, ItemSection>>(null);
  const sectionSelectionRef = React.useRef<FlatList<ItemSection>>(null);

  const sections: ItemSection[] = [
    {
      title: "Melee Weapons",
      data: items.filter(item => item.item_type === ItemType.Weapon && item.weapon_type === WeaponType.Melee),
      sectionKey: { item_type: ItemType.Weapon, weapon_type: WeaponType.Melee }
    },
    {
      title: "Ranged Weapons",
      data: items.filter(item => item.item_type === ItemType.Weapon && item.weapon_type === WeaponType.Ranged),
      sectionKey: { item_type: ItemType.Weapon, weapon_type: WeaponType.Ranged }
    },
    {
      title: "Blackpowder Weapons",
      data: items.filter(item => item.item_type === ItemType.Weapon && item.weapon_type === WeaponType.Blackpowder),
      sectionKey: { item_type: ItemType.Weapon, weapon_type: WeaponType.Blackpowder }
    },
    {
      title: "Armour",
      data: items.filter(item => item.item_type === ItemType.Armour),
      sectionKey: { item_type: ItemType.Armour, weapon_type: null }
    },
    {
      title: "Miscellaneous Items",
      data: items.filter(item => item.item_type === ItemType.MiscItem),
      sectionKey: { item_type: ItemType.MiscItem, weapon_type: null }
    }
  ];

  const renderSectionSelectionHeading = ({ item: section }: { item: ItemSection }) => (
    <Pressable
      style={[
        styles.typeItem,
        currentSection != null && getSectionKey(currentSection) == getSectionKey(section.sectionKey) && styles.selectedTypeItem
      ]}
      onPress={() => onItemTypeSelect(section)}
    >
      <Text style={[
        styles.typeItemText,
        currentSection != null && getSectionKey(currentSection) == getSectionKey(section.sectionKey) && styles.selectedTypeItemText
      ]}>
        {section.title}
      </Text>
    </Pressable>
  );

  const renderSectionHeader = ({ section: { title } }: { section: ItemSection }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

  const onItemTypeSelect = React.useCallback((item: ItemSection) => {
    setCurrentSection(item.sectionKey);
    sectionListRef?.current?.scrollToLocation({
      sectionIndex: sections.findIndex(s => s.sectionKey.item_type === item.sectionKey.item_type && s.sectionKey.weapon_type === item.sectionKey.weapon_type),
      itemIndex: 1,
      animated: true
    });
  }, [items]);

  const onViewableItemsChanged = ({ viewableItems, changed }: { viewableItems: ViewToken<Item>[], changed: ViewToken<Item>[] }) => {
    // Set the current section to the first viewable item
    if (viewableItems.length > 0) {
      setCurrentSection(viewableItems[0].section.sectionKey);
    }
    console.log(sections.findIndex(s => s.sectionKey === viewableItems[0].section.sectionKey));
    sectionSelectionRef?.current?.scrollToIndex({
      index: sections.findIndex(s => s.sectionKey === viewableItems[0].section.sectionKey),
      animated: true,
      viewPosition: 0.5,
    });
  }

  return (<View style={styles.container}>
    <Text style={styles.title}>All Items</Text>
    <View style={styles.typeListContainer}>
      <FlatList
        ref={sectionSelectionRef}
        horizontal
        data={sections}
        renderItem={renderSectionSelectionHeading}
        keyExtractor={(item) => getSectionKey(item.sectionKey)}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.typeListContent}
      />
    </View>
    <View style={styles.sectionListContainer}>
      <SectionList<Item, ItemSection>
        ref={sectionListRef}
        sections={sections}
        renderItem={({ item }: { item: Item }) => <ItemListItem item={item} />}
        renderSectionHeader={renderSectionHeader}
        onViewableItemsChanged={onViewableItemsChanged}
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
