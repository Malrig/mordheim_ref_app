import { StyleSheet, FlatList, SectionList, Pressable, ViewToken } from "react-native";
import * as React from 'react';
import { ItemType, WeaponType } from "../../library/types/enums";
import { useState } from "react";
import ItemListItem from "./item_list";
import { ThemedText, ThemedView } from "../general/themed_components";
import { useThemeColour } from "@/library/stores/user/utils/theme";

interface SectionKey {
  item_type: ItemType;
  weapon_type: WeaponType | null;
}

interface ItemSection {
  title: string;
  data: ItemObject[];
  sectionKey: SectionKey;
};

interface ItemObject {
  id: string,
  item_type: string,
  weapon_type: string | null,
}

function getSectionKey(key: SectionKey) {
  return `${key.item_type}-${key.weapon_type}`;
}

type Props = {
  items: ItemObject[]
}

export default function SectionedItemList({ items }: Props) {
  const [currentSection, setCurrentSection] = useState<SectionKey | null>(null);
  const sectionListRef = React.useRef<SectionList<ItemObject, ItemSection>>(null);
  const sectionSelectionRef = React.useRef<FlatList<ItemSection>>(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
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
      backgroundColor: useThemeColour("tabIconDefault"),
    },
    selectedTypeItem: {
      backgroundColor: useThemeColour("tabIconSelected"),
    },
    selectedTypeItemText: {
      color: useThemeColour("grey"),
      fontWeight: 'bold',
    },
    sectionListContainer: {
      flex: 1,
    },
    sectionHeader: {
      padding: 10,
      marginTop: 0,
    },
    itemContainer: {
      padding: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

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
      <ThemedText style={
        ((currentSection != null && getSectionKey(currentSection) == getSectionKey(section.sectionKey)) ? { ...styles.selectedTypeItemText } : {})
      }>
        {section.title}
      </ThemedText>
    </Pressable>
  );

  const renderSectionHeader = ({ section: { title } }: { section: ItemSection }) => (
    <ThemedView style={styles.sectionHeader}>
      <ThemedText variant="subtitle">{title}</ThemedText>
    </ThemedView>
  );

  const onItemTypeSelect = React.useCallback((item: ItemSection) => {
    setCurrentSection(item.sectionKey);
    sectionListRef?.current?.scrollToLocation({
      sectionIndex: sections.findIndex(s => s.sectionKey.item_type === item.sectionKey.item_type && s.sectionKey.weapon_type === item.sectionKey.weapon_type),
      itemIndex: 1,
      animated: true
    });
  }, [items]);

  const onViewableItemsChanged = ({ viewableItems, changed }: { viewableItems: ViewToken<ItemObject>[], changed: ViewToken<ItemObject>[] }) => {
    // Set the current section to the first viewable item
    if (viewableItems.length > 0) {
      setCurrentSection(viewableItems[0].section.sectionKey);
    }
    sectionSelectionRef?.current?.scrollToIndex({
      index: sections.findIndex(s => s.sectionKey === viewableItems[0].section.sectionKey),
      animated: true,
      viewPosition: 0.5,
    });
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText variant="title">All Items</ThemedText>
      <ThemedView style={styles.typeListContainer}>
        <FlatList
          ref={sectionSelectionRef}
          horizontal
          data={sections}
          renderItem={renderSectionSelectionHeading}
          keyExtractor={(item) => getSectionKey(item.sectionKey)}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.typeListContent}
        />
      </ThemedView>
      <ThemedView style={styles.sectionListContainer}>
        <SectionList<ItemObject, ItemSection>
          ref={sectionListRef}
          sections={sections}
          renderItem={({ item }: { item: ItemObject }) => <ItemListItem item={item} />}
          renderSectionHeader={renderSectionHeader}
          onViewableItemsChanged={onViewableItemsChanged}
          keyExtractor={(item) => item.id}
          stickySectionHeadersEnabled={true}
        />
      </ThemedView>
    </ThemedView>
  );
}
