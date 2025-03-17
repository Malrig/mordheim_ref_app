import { Text, View, FlatList, Pressable, StyleSheet } from "react-native";
import { Link } from 'expo-router';
import * as React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { Divider, List } from "react-native-paper";

import { Skill } from '@/library/types/skills';
import { useAppDispatch, useAppSelector } from "@/library/store/hooks";
import { skillUpdated } from "@/library/store/features/skillsSlice";
import { MiscItem, Armour, ItemType } from "@/library/types/items";
import { weaponUpdated } from "@/library/store/features/weaponSlice";
import { selectSpecialRulesByIds } from "@/library/store/features/specialRulesSlice";
import Divider from "../general/divider";
import ColonText from "../general/colon_text";
import { armourUpdated } from "@/library/store/features/armoursSlice";
import { miscItemUpdated } from "@/library/store/features/miscItemsSlice";

type SupportedItems = Armour | MiscItem

type Props = {
  item: SupportedItems
}

// Functions used to ensure that the switch statement is exhaustive.
function ensureExhaustive(p: never): never;
function ensureExhaustive(p: SupportedItems) {
  throw new Error('Unknown pet kind: ' + p);
}

export default function ItemListItem({ item }: Props) {
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useAppDispatch();

  const onFavouritePress = () => {
    let updatedItem = { ...item };
    updatedItem.favourite = !updatedItem.favourite;

    switch (item.item_type) {
      case ItemType.Armour:
        dispatch(armourUpdated(updatedItem as Armour));
        break
      case ItemType.MiscItem:
        dispatch(miscItemUpdated(updatedItem as MiscItem));
        break
      default:
        ensureExhaustive(item);
    }
  }

  return (
    <Pressable style={styles.item} onPress={() => setExpanded(!expanded)}>
      <View style={styles.header}>
        <Pressable onPress={() => onFavouritePress()}>
          <FontAwesome name={item.favourite ? "heart" : "heart-o"} />
        </Pressable>
        <Text> {item.name}</Text>
        <FontAwesome style={[{ marginLeft: "auto" }]} name={expanded ? "chevron-up" : "chevron-down"} />
      </View>
      {expanded && <>{item.description}</>}
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
  },
  description_text: {
    fontStyle: "italic",
    fontSize: 12,
  }
});
