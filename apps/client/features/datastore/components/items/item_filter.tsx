import React from 'react';
import { StyleSheet } from 'react-native';
import { ItemType, WeaponType } from '../../enums';
import {
  ThemedTextInput,
  ThemedText,
  ThemedPicker,
} from '@/shared/components/themed_components';
import { Expandable } from '@/shared/components/expandable';

type Props = {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  selectedType: ItemType | null;
  onTypeChange: (type: ItemType | null) => void;
};

interface SearchableItem {
  id: string;
  name: string;
  description: string;
  item_type: ItemType;
  weapon_type: WeaponType | null;
}

export function filterItems(
  items: SearchableItem[],
  searchQuery: string,
  selectedType: ItemType | null
) {
  return items.filter((item) => {
    const matchesSearch = item.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || item.item_type == selectedType;
    return matchesSearch && matchesType;
  });
}

export default function ItemFilter({
  searchQuery,
  onSearchQueryChange,
  selectedType,
  onTypeChange,
}: Props) {
  return (
    <Expandable
      title="Filter"
      containerStyle={styles.container}
      initialExpanded={true}
    >
      <ThemedTextInput
        style={styles.searchInput}
        placeholder="Search items..."
        value={searchQuery}
        onChangeText={onSearchQueryChange}
      />
      <ThemedText style={styles.label}>Type:</ThemedText>
      <ThemedPicker
        selectedValue={selectedType ?? ''}
        onValueChange={(itemValue) => {
          if (itemValue === '') {
            onTypeChange(null);
          } else {
            onTypeChange(itemValue as ItemType);
          }
        }}
        style={styles.picker}
      >
        <ThemedPicker.Item label="All Types" value="" />
        <ThemedPicker.Item label="Weapons" value={ItemType.Weapon} />
        <ThemedPicker.Item label="Armour" value={ItemType.Armour} />
        <ThemedPicker.Item label="Misc Items" value={ItemType.MiscItem} />
      </ThemedPicker>
      <ThemedText>
        TODO: Include filtering on: tags, availability, source, price, rarity,
        etc.
      </ThemedText>
    </Expandable>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
    minWidth: 50,
  },
  picker: {
    flex: 1,
  },
});
