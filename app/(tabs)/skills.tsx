import { Text, View, FlatList, TextInput, StyleSheet } from "react-native";
import { Link } from 'expo-router';
import * as React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAppSelector, useAppDispatch } from '@/library/store/hooks'
// import { Divider, List } from "react-native-paper";

import SkillListItem from "@/components/skills/list_item"
import NewSkill from "@/components/skills/new_skill";
import { fetchSkills, selectAllSkills, selectSkillsError, selectSkillsStatus } from "@/library/store/features/skillsSlice";
import { Skill } from "@/library/types/skills";
import ObjectList from "@/components/general/object_list";

// What does this page do?
// - Display all the skills we have in the campaign
//   - Group them by skill group
//   - Minimal data: Name, Description (formatted)
//   - Optional / future data: Source / Homebrew, Restriction / group
// - Allow filtering the skills to specific groups / restrictions in the future. For now just pick and choose the one you want to see.
//   - So people may want to view skills that certain warbands have access to, certain heroes in warbands, potentially in the future link somehow to someones warband.



export default function Skills() {
  const dispatch = useAppDispatch();
  const skills = useAppSelector(selectAllSkills);
  const skillStatus = useAppSelector(selectSkillsStatus);
  const skillsError = useAppSelector(selectSkillsError);

  React.useEffect(() => {
    if (skillStatus === 'idle') {
      dispatch(fetchSkills())
    }
  }, [skillStatus, dispatch])

  let content: React.ReactNode

  if (skillStatus === "pending") {
    content = <Text>Loading</Text>
  } else if (skillStatus === "succeeded") {
    content = <>
      <Text>TODO: Allow searching / filtering of skills.</Text>
      <ObjectList<Skill> objects={skills} renderObject={(object) => <SkillListItem skill={object} />} />
    </>
  } else if (skillStatus === "failed") {
    content = <Text>Loading skills failed</Text>
  }

  return (
    <View style={{ flex: 1 }}>
      {/* <NewSkill /> */}
      {content}
    </View>
  );
}
