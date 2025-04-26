import { View, FlatList, Pressable, StyleSheet } from "react-native";
import * as React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Divider from "../../../components/general/divider";
import ColonText from "../../general/colon_text";
import { Item } from "../../../library/stores/data/objects/item";
import { toggleFavouriteCallback } from "@/library/stores/user/utils/favourites";
import { ThemedText } from "@/components/general/themed_components";

type Props = {
  weapon: { id: string }
}

export default function WeaponListItem({ weapon }: Props) {
  const [expanded, setExpanded] = React.useState(false);

  const item_object = Item.useInstance(weapon.id);
  const metadata_info = item_object.useMetadata();
  const special_rules = item_object.useSpecialRules();
  const isFavourite = item_object.useFavourite();

  const setFavouriteCb = toggleFavouriteCallback(Item.TABLE_NAME, item_object.id);

  return (
    <Pressable style={styles.item} onPress={() => setExpanded(!expanded)}>
      <View style={styles.header}>
        <Pressable onPress={() => {console.log("Pressed"); setFavouriteCb()}}>
          <FontAwesome name={isFavourite ? "heart" : "heart-o"} />
        </Pressable>
        <ThemedText> {item_object.name}</ThemedText>
        <FontAwesome style={[{ marginLeft: "auto" }]} name={expanded ? "chevron-up" : "chevron-down"} />
      </View>
      {expanded && <>
        <Divider />
        {/* <Text style={styles.description_text}>{weapon.description}</Text> */}
        <ColonText before="Range" after={item_object.range?.toString() || ''} />
        <ColonText before="Strength" after={item_object.strength?.toString() || ''} />
        <Divider />
        <ThemedText>Special Rules:</ThemedText>
        <FlatList data={special_rules} renderItem={({ item }) => <>
          <ColonText before={item.name} after={item.description} />
        </>} />
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
  },
  description_text: {
    fontStyle: "italic",
    fontSize: 12,
  }
});
