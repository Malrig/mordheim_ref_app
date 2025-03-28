import { Text, View, FlatList, Pressable, StyleSheet } from "react-native";
import { Link } from 'expo-router';
import * as React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { Divider, List } from "react-native-paper";

import { useAppDispatch, useAppSelector } from "@/library/store/hooks";
import { ItemType } from "@/library/types/items";
import { Armour, MiscItem } from "@/library/types/items";
import { itemUpdated } from "@/library/store/features/itemsSlice";
import RichText from "@/components/general/markdown_text";

type SupportedItems = Armour | MiscItem

type Props = {
  item: SupportedItems
}

export default function OtherItemListItem({ item }: Props) {
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useAppDispatch();

  const onFavouritePress = () => {
    let updatedItem = { ...item };
    updatedItem.favourite = !updatedItem.favourite;

    dispatch(itemUpdated(updatedItem));
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
      {expanded && <RichText text={item.description} />}
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
