import { Text, View, FlatList, TextInput, StyleSheet } from "react-native";
import { Link } from 'expo-router';
import * as React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { Divider, List } from "react-native-paper";

import SkillListItem from "../../components/skills/list_item"
import ObjectList from "../../components/general/object_list";
import { Skill } from "@/library/tinybase_store/objects/skill";
import { useRowIds } from "@/library/tinybase_store/ui";
import { Id } from "tinybase/with-schemas";
// What does this page do?
// - Display all the skills we have in the campaign
//   - Group them by skill group
//   - Minimal data: Name, Description (formatted)
//   - Optional / future data: Source / Homebrew, Restriction / group
// - Allow filtering the skills to specific groups / restrictions in the future. For now just pick and choose the one you want to see.
//   - So people may want to view skills that certain warbands have access to, certain heroes in warbands, potentially in the future link somehow to someones warband.



export default function Skills() {
  const skills = useRowIds("skills");

  return (
    <View style={{ flex: 1 }}>
      {/* <NewSkill /> */}
      <Text>TODO: Allow searching / filtering of skills.</Text>
      {/* <ObjectList<Skill> objects={skills} renderObject={(object) => <SkillListItem skill={object} />} /> */}
      <FlatList
        data={skills}
        renderItem={({ item }: { item: Id }) => <SkillListItem skill={item} />}
        keyExtractor={(item) => item}
      />
    </View>
  );
  ;
}
