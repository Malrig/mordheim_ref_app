import { FlatList } from "react-native";
import { Link } from 'expo-router';
import SkillListItem from "../../../components/skills/list_item";
import React from "react";
import { ThemedView, ThemedText } from "@/components/general/themed_components";

// What does this page do?
// - Displays all the information that people have chosen to appear here.
//   - E.g. favourited weapons, armour, equipment, and skills.
//   - Spells / magic that people have favourited.
//   - Particular rules (e.g. shooting, movement etc).
// - Advanced critical hits
// - Any other common rules that are looked up often.
//   - Various psychology things
//   - Mounted warriors rules
//   - Misfire rules, etc.

export default function Favourites() {
  // const skills = useAppSelector(selectFavouriteSkills);
  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedText>TODO: Implement favourites list</ThemedText>
      {/* <FlatList data={skills} renderItem={({ item }) => <><SkillListItem skill={item} /></>} /> */}
    </ThemedView>
  );
}
