import { TextInput, StyleSheet } from "react-native";
import { Item, ItemType } from "../../library/types/items";
import { ThemedTextInput, ThemedText, ThemedView, ThemedPicker } from "../general/themed_components";
import { useThemeColour } from "@/library/stores/user/utils/theme";

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
    <ThemedView style={styles.container} backgroundColor="secondary">
      <ThemedTextInput
        style={styles.searchInput}
        placeholder="Search items..."
        value={searchQuery}
        onChangeText={onSearchQueryChange}
      />
      <ThemedView style={styles.pickerContainer} backgroundColor="secondary">
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
      </ThemedView>
      <ThemedText>TODO: Include filtering on: tags, availability, source, price, rarity, etc.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 8,
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
