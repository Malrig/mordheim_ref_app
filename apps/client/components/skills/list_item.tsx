import { View, FlatList, Pressable, StyleSheet } from "react-native";
import * as React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Divider from '../general/divider';
import { Id } from "tinybase/with-schemas";

import { Skill } from "../../library/stores/data/objects/skill";
import { toggleFavouriteCallback } from "@/library/stores/user/utils/favourites";
import { ThemedText } from "../general/themed_components";

type Props = {
  skill: Id
}

export default function SkillListItem({ skill }: Props) {
  const [expanded, setExpanded] = React.useState(false);

  const skill_object = Skill.useInstance(skill);
  const metadata_info = skill_object.useMetadata();
  const isFavourite = skill_object.useFavourite();
  console.log(metadata_info);

  const setFavouriteCb = toggleFavouriteCallback(Skill.TABLE_NAME, skill_object.id);


  return (
    <Pressable style={styles.item} onPress={() => setExpanded(!expanded)}>
      <View style={styles.header}>
        <Pressable onPress={() => {console.log("Pressed"); setFavouriteCb()}}>
          <FontAwesome name={isFavourite ? "heart" : "heart-o"} />
        </Pressable>
        <ThemedText> {skill_object.name}</ThemedText>
        <FontAwesome style={[{ marginLeft: "auto" }]} name={expanded ? "chevron-up" : "chevron-down"} />
      </View>
      {expanded && <>
        <Divider />
        <ThemedText>{skill_object.description}</ThemedText>
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
