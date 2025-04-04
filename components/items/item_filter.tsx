import { View, TextInput, StyleSheet, Text } from "react-native";
import { Item, ItemType } from "@/library/types/items";
import { Picker } from '@react-native-picker/picker';

type Props = {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  selectedType: ItemType | null;
  onTypeChange: (type: ItemType | null) => void;
}

export function filterItems(items: Item[], searchQuery: string, selectedType: ItemType | null) {
  return items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());
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
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search items..."
        value={searchQuery}
        onChangeText={onSearchQueryChange}
      />
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Type:</Text>
        <Picker
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
          <Picker.Item label="All Types" value="" />
          <Picker.Item label="Weapons" value={ItemType.Weapon} />
          <Picker.Item label="Armour" value={ItemType.Armour} />
          <Picker.Item label="Misc Items" value={ItemType.MiscItem} />
        </Picker>
      </View>
      <Text>TODO: Include filtering on: tags, availability, source, price, rarity, etc.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    margin: 10,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
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
    height: 40,
  },
});
