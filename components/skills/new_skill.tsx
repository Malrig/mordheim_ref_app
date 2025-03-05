import { Text, View, Pressable, TextInput } from "react-native";
import { Link } from 'expo-router';
import * as React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAppSelector } from '@/library/store/hooks'
// import { Divider, List } from "react-native-paper";
import { nanoid } from '@reduxjs/toolkit'

import { useAppDispatch } from '@/library/store/hooks'
import { skillAdded } from '@/library/store/features/skillsSlice'
import { type Skill } from '@/library/types/skills';
import { SourceStatus } from "@/library/types/metadata";

// What does this page do?
// - Display all the skills we have in the campaign
//   - Group them by skill group
//   - Minimal data: Name, Description (formatted)
//   - Optional / future data: Source / Homebrew, Restriction / group
// - Allow filtering the skills to specific groups / restrictions in the future. For now just pick and choose the one you want to see.
//   - So people may want to view skills that certain warbands have access to, certain heroes in warbands, potentially in the future link somehow to someones warband.



export default function NewSkill() {
  const [newSkillName, onChangeNewSkillName] = React.useState('');
  const [newDescription, onChangeNewDescription] = React.useState('');
  const [newGroup, onChangeNewGroup] = React.useState('');

  const dispatch = useAppDispatch();

  return (
    <View>
      <View>
        <Text>New Skill</Text>
        <TextInput value={newSkillName} onChangeText={onChangeNewSkillName} placeholder="Skill Name" />
        <TextInput value={newDescription} onChangeText={onChangeNewDescription} placeholder="Description" />
        <TextInput value={newGroup} onChangeText={onChangeNewGroup} placeholder="Group name" />
        <Pressable onPress={() => {
          dispatch(skillAdded(
            newSkillName,
            newDescription,
            newGroup
          ));
          onChangeNewSkillName("");
          onChangeNewDescription("");
          onChangeNewGroup("");
        }}>
          <Text>Add Skill</Text>
        </Pressable>
      </View>
    </View>
  );
}
