import { Text, View, FlatList, Pressable } from "react-native";
import { Link } from 'expo-router';
import * as React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { Divider, List } from "react-native-paper";

import { Skill } from '@/library/types/skills';
import { useAppDispatch } from "@/library/store/hooks";
import { skillUpdated } from "@/library/store/features/skillsSlice";

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
    <View>
      <View style={[{ flexDirection: 'row', }]}>
        <Pressable style={[{ flexDirection: 'row', }]} onPress={() => setExpanded(!expanded)}>
          <FontAwesome name={expanded ? "chevron-up" : "chevron-down"} />
          <Text>{skill.name}</Text>
        </Pressable>
        <View style={[{ marginLeft: "auto" }]}>
          <Pressable style={[{ flexDirection: 'row', }]} onPress={() => onFavouritePress()}>
            <FontAwesome name={skill.favourite ? "heart" : "heart-o"} />
          </Pressable>
        </View>
      </View>
      {expanded && <Text>{skill.description}</Text>}
    </View>
  );
}
