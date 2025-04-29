import { View, Pressable, StyleSheet } from "react-native";
import * as React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ThemedText } from "@/components/general/themed_components";
import RichText from "../../../components/general/markdown_text";
import { Item } from "../../../library/stores/data/objects/item";
import { toggleFavouriteCallback } from "@/library/stores/user/utils/favourites";
import { Expandable } from "@/components/general/expandable";

interface Props {
  item: { id: string }
}

export default function OtherItemListItem({ item }: Props) {
  const item_object = Item.useInstance(item.id);
  // const metadata_info = item_object.useMetadata();
  const isFavourite = item_object.useFavourite();

  const setFavouriteCb = toggleFavouriteCallback(Item.TABLE_NAME, item_object.id);

  const header = (
    <View style={styles.header}>
      <Pressable onPress={() => { console.log("Pressed"); setFavouriteCb() }}>
        <FontAwesome name={isFavourite ? "heart" : "heart-o"} />
      </Pressable>
      <ThemedText> {item_object.name}</ThemedText>
    </View>
  );

  return (
    <Expandable
      title={header}
      containerStyle={styles.item}
      contentStyle={styles.content}
    >
      <RichText text={item_object.description} />
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
  }
});
