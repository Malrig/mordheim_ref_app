import { Text, View, FlatList, Pressable, StyleSheet } from "react-native";
import * as React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { Divider, List } from "react-native-paper";

import RichText from "../../../components/general/markdown_text";
import { Item } from "../../../library/stores/data/objects/item";
import Divider from "../../../components/general/divider";
import { toggleFavouriteCallback } from "@/library/stores/user/utils/favourites";

interface Props {
  item: { id: string }
}

export default function OtherItemListItem({ item }: Props) {
  const [expanded, setExpanded] = React.useState(false);

  const item_object = Item.useInstance(item.id);
  const metadata_info = item_object.useMetadata();
  const isFavourite = item_object.useFavourite();

  const setFavouriteCb = toggleFavouriteCallback(Item.TABLE_NAME, item_object.id);

  return (
    <Pressable style={styles.item} onPress={() => setExpanded(!expanded)}>
      <View style={styles.header}>
        <Pressable onPress={() => {console.log("Pressed"); setFavouriteCb()}}>
          <FontAwesome name={isFavourite ? "heart" : "heart-o"} />
        </Pressable>
        <Text> {item_object.name}</Text>
        <FontAwesome style={[{ marginLeft: "auto" }]} name={expanded ? "chevron-up" : "chevron-down"} />
      </View>
      {expanded && <><Divider /><RichText text={item_object.description} /></>}
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
