import { View, FlatList, Pressable, StyleSheet } from "react-native";
import * as React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Divider from "../../../components/general/divider";
import ColonText from "../../general/colon_text";
import { Item } from "../../../library/stores/data/objects/item";
import { toggleFavouriteCallback } from "@/library/stores/user/utils/favourites";
import { ThemedText, ThemedView } from "@/components/general/themed_components";
import { Expandable } from "@/components/general/expandable";
import { useThemeColour } from "@/library/stores/user/utils/theme";

type Props = {
  weapon: { id: string }
}

export default function WeaponListItem({ weapon }: Props) {
  const item_object = Item.useInstance(weapon.id);
  const metadata_info = item_object.useMetadata();
  const special_rules = item_object.useSpecialRules();
  const isFavourite = item_object.useFavourite();
  const background_colour = useThemeColour('secondary');

  const setFavouriteCb = toggleFavouriteCallback(Item.TABLE_NAME, item_object.id);

  const header = (
    <View style={styles.header}>
      <Pressable onPress={() => { console.log("Pressed"); setFavouriteCb() }}>
        <FontAwesome name={isFavourite ? "heart" : "heart-o"} />
      </Pressable>
      <ThemedText>{item_object.name}</ThemedText>
    </View>
  );

  return (
    <Expandable
      title={header}
      containerStyle={styles.item}
      contentStyle={styles.content}
    >
      <ColonText before="Range" after={item_object.range?.toString() || ''} containerStyle={{ backgroundColor: background_colour }} />
      <ColonText before="Strength" after={item_object.strength?.toString() || ''} containerStyle={{ backgroundColor: background_colour }} />

      <Divider />
      <ThemedText variant="subtitle">Special Rules:</ThemedText>
      <FlatList data={special_rules} renderItem={({ item }) => <>
        <ColonText before={item.name} after={item.description} containerStyle={{ backgroundColor: background_colour }} />
      </>} />
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
    padding: 5,
  },
  colonText: {
    margin: 3,
  }
});
