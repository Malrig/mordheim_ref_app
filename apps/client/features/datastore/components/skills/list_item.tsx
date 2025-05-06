import { View, FlatList, Pressable, StyleSheet } from "react-native";
import * as React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Divider from '@/shared/components/divider';
import { Id } from "tinybase/with-schemas";

import { Skill } from "@/features/datastore/objects/skill";
import { toggleFavouriteCallback } from "@/features/userstore/hooks/favourites";
import { ThemedText } from "@/shared/components/themed_components";
import { Expandable } from "@/shared/components/expandable";
import { router } from "expo-router";

type Props = {
  skill: Id
}

export default function SkillListItem({ skill }: Props) {
  const skill_object = Skill.useInstance(skill);
  // const metadata_info = skill_object.useMetadata();
  const isFavourite = skill_object.useFavourite();

  const setFavouriteCb = toggleFavouriteCallback(Skill.TABLE_NAME, skill_object.id);

  const header = (
    <View style={styles.header}>
      <Pressable onPress={() => { console.log("Pressed"); setFavouriteCb() }}>
        <FontAwesome name={isFavourite ? "heart" : "heart-o"} />
      </Pressable>
      <ThemedText> {skill_object.name}</ThemedText>
      <Pressable onPress={() => router.push(`/skills/${skill_object.id}`)} style={styles.detailsButton}>
        <FontAwesome name="info-circle" />
      </Pressable>
    </View>
  );

  return (
      <Expandable
        title={header}
        containerStyle={styles.item}
        contentStyle={styles.content}
      >
        <ThemedText>{skill_object.description}</ThemedText>
    </Expandable>
  );
}

const styles = StyleSheet.create({
  item: {
    borderRadius: 10,
    borderColor: '#000000',
    borderWidth: 1,
    margin: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: "center",
  },
  content: {
    padding: 3,
  },
  detailsButton: {
    marginLeft: 'auto',
    padding: 8,
  }
});
