import { Text, View, FlatList, Pressable, StyleSheet } from "react-native";
import { Link } from 'expo-router';
import * as React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Divider from '../general/divider';
import { Id } from "tinybase/with-schemas";

import { Skill } from "../../library/stores/data/objects/skill";
import { useSetPartialRowCallback } from "../../library/stores/data/ui";
type Props = {
  skill: Id
}

export default function SkillListItem({ skill }: Props) {
  const [expanded, setExpanded] = React.useState(false);

  const skill_object = Skill.useInstance(skill);
  const metadata_info = skill_object.useMetadata();
  console.log(metadata_info);

  const onFavouritePress = useSetPartialRowCallback(
    'metadata',
    metadata_info?.table_name_id || '',
    (favourite: boolean) => ({ favourite: favourite })
  );

  return (
    <Pressable style={styles.item} onPress={() => setExpanded(!expanded)}>
      <View style={styles.header}>
        <Pressable onPress={() => onFavouritePress(!metadata_info?.favourite)}>
          <FontAwesome name={metadata_info?.favourite ? "heart" : "heart-o"} />
        </Pressable>
        <Text> {skill_object.name}</Text>
        <FontAwesome style={[{ marginLeft: "auto" }]} name={expanded ? "chevron-up" : "chevron-down"} />
      </View>
      {expanded && <>
        <Divider />
        <Text>{skill_object.description}</Text>
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
