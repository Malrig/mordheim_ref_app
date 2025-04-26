import { FlatList, TextInput, StyleSheet } from "react-native";
import { ThemedView, ThemedTextInput, ThemedText } from "@/components/general/themed_components";
import SkillListItem from "../../../components/skills/list_item"
import { Id } from "tinybase/with-schemas";
import { DataStore } from "../../../library/stores/stores";

// What does this page do?
// - Display all the skills we have in the campaign
//   - Group them by skill group
//   - Minimal data: Name, Description (formatted)
//   - Optional / future data: Source / Homebrew, Restriction / group
// - Allow filtering the skills to specific groups / restrictions in the future. For now just pick and choose the one you want to see.
//   - So people may want to view skills that certain warbands have access to, certain heroes in warbands, potentially in the future link somehow to someones warband.

export default function Skills() {
  const skills = DataStore.storeUIHooks.useRowIds("skills");

  return (
    <ThemedView style={styles.container}>
      <ThemedText>TODO: Allow searching / filtering of skills.</ThemedText>
      <FlatList
        data={skills}
        renderItem={({ item }: { item: Id }) => <SkillListItem skill={item} />}
        keyExtractor={(item) => item}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
