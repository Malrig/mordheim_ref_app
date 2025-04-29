import { FlatList, StyleSheet } from "react-native";
import { ThemedView, ThemedText } from "@/components/general/themed_components";
import SkillListItem from "../../../components/skills/list_item"
import { Id } from "tinybase/with-schemas";
import { DataStore } from "../../../library/stores/stores";
import { Skill } from "@/library/stores/data/objects/skill";
import { SkillGroup } from "@/library/stores/data/objects/skill_group";
import { useMemo, useState } from "react";
import SkillFilter, { filterSkills } from "@/components/skills/skill_filter";
import SectionedSkillList from "@/components/skills/sectioned_skill_list";

// What does this page do?
// - Display all the skills we have in the campaign
//   - Group them by skill group
//   - Minimal data: Name, Description (formatted)
//   - Optional / future data: Source / Homebrew, Restriction / group
// - Allow filtering the skills to specific groups / restrictions in the future. For now just pick and choose the one you want to see.
//   - So people may want to view skills that certain warbands have access to, certain heroes in warbands, potentially in the future link somehow to someones warband.

export default function Skills() {
  const [selectedSkillGroupId, onSkillGroupIdChange] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const skills = Object.values(DataStore.storeUIHooks.useTable(
    Skill.TABLE_NAME,
    DataStore.store_id
  )).map((row) => Skill.fromRow(row));

  const filteredSkills = useMemo(() => {
    return filterSkills(skills, searchQuery, selectedSkillGroupId);
  },
  [skills, searchQuery, selectedSkillGroupId],
);

  return (
    <ThemedView style={styles.container}>
      <ThemedText>TODO: Allow searching / filtering of skills.</ThemedText>
      <SkillFilter
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        selectedSkillGroupId={selectedSkillGroupId}
        onSkillGroupIdChange={onSkillGroupIdChange}
      />
      <SectionedSkillList skills={filteredSkills} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
