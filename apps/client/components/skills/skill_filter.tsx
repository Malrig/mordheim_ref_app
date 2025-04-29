import { StyleSheet } from "react-native";
import { ItemType, WeaponType } from "../../library/types/enums";
import { ThemedTextInput, ThemedText, ThemedView, ThemedPicker } from "../general/themed_components";
import { Expandable } from "../general/expandable";
import { DataStore } from "@/library/stores/stores";
import { SkillGroup } from "@/library/stores/data/objects/skill_group";

type Props = {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  selectedSkillGroupId: string | null;
  onSkillGroupIdChange: (type: ItemType | null) => void;
}

interface SearchableSkill {
  id: string;
  name: string;
  description: string;
  group_id: string;
}

export function filterSkills(items: SearchableSkill[], searchQuery: string, selectedSkillGroup: string | null) {
  return items.filter(item => {
    const matchesSearch = item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedSkillGroup || item.group_id == selectedSkillGroup;
    return matchesSearch && matchesType;
  });
}

export default function SkillFilter({
  searchQuery,
  onSearchQueryChange,
  selectedSkillGroupId: selectedType,
  onSkillGroupIdChange: onTypeChange,
}: Props) {
  const skill_groups = Object.values(DataStore.storeUIHooks.useTable(
    SkillGroup.TABLE_NAME,
    DataStore.store_id
  ));

  if (!skill_groups) {
    return <ThemedText>Loading skill groups...</ThemedText>;
  }

  return (
    <Expandable title="Filter" containerStyle={styles.container} initialExpanded={true}>
      <ThemedTextInput
        style={styles.searchInput}
        placeholder="Search skills..."
        value={searchQuery}
        onChangeText={onSearchQueryChange}
      />
      <ThemedText style={styles.label}>Group:</ThemedText>
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
        <ThemedPicker.Item label="All Groups" value=""/>
        {skill_groups.map(group => <ThemedPicker.Item label={group.name} value={group.id}/>)}
      </ThemedPicker>
      <ThemedText>TODO: Include filtering on: tags, availability, source, price, rarity, etc.</ThemedText>
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
