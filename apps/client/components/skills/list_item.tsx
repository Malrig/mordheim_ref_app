import { Text, View, FlatList, Pressable, StyleSheet } from "react-native";
import { Link } from 'expo-router';
import * as React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { Divider, List } from "react-native-paper";

import { Skill } from '@/library/types/skills';
import { useAppDispatch } from "@/library/store/hooks";
import { skillUpdated } from "@/library/store/features/skillsSlice";
import Divider from "../general/divider";

type Props = {
  skill: Skill
}

export default function SkillListItem({ skill }: Props) {
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useAppDispatch();

  const onFavouritePress = () => {
    let updatedSkill = {
      id: skill.id,
      name: skill.name,
      description: skill.description,
      group: skill.group,
      source: skill.source,
      source_type: skill.source_type,
      favourite: !skill.favourite,
    }
    dispatch(skillUpdated(updatedSkill));
  }

  return (
    <Pressable style={styles.item} onPress={() => setExpanded(!expanded)}>
      <View style={styles.header}>
        <Pressable onPress={() => onFavouritePress()}>
          <FontAwesome name={skill.favourite ? "heart" : "heart-o"} />
        </Pressable>
        <Text> {skill.name}</Text>
        <FontAwesome style={[{ marginLeft: "auto" }]} name={expanded ? "chevron-up" : "chevron-down"} />
      </View>
      {expanded && <>
        <Divider />
        <Text>{skill.description}</Text>
      </>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'column',
    borderRadius: 10,
    borderColor: '#000000',
    borderWidth: 1,
    padding: 3,
    margin: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: "center",
  }
});
