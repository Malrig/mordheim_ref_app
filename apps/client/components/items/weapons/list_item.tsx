import { Text, View, FlatList, Pressable, StyleSheet } from "react-native";
import { Link } from 'expo-router';
import * as React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Divider from "../../../components/general/divider";
import ColonText from "../../general/colon_text";
import { Item } from "../../../library/stores/data/objects/item";
import { useSetPartialRowCallback } from "../../../library/stores/data/ui";
import { DATA_STORE_ID } from "@/library/stores/data/store";
type Props = {
  weapon: { id: string }
}

export default function WeaponListItem({ weapon }: Props) {
  const [expanded, setExpanded] = React.useState(false);

  const item_object = Item.useInstance(weapon.id);
  const metadata_info = item_object.useMetadata();
  const special_rules = item_object.useSpecialRules();

  const onFavouritePress = useSetPartialRowCallback(
    'metadata',
    metadata_info?.table_name_id || '',
    (favourite: boolean) => ({ favourite: favourite }),
    undefined,
    DATA_STORE_ID,
  );

  return (
    <Pressable style={styles.item} onPress={() => setExpanded(!expanded)}>
      <View style={styles.header}>
        <Pressable onPress={() => onFavouritePress(!metadata_info?.favourite)}>
          <FontAwesome name={metadata_info?.favourite ? "heart" : "heart-o"} />
        </Pressable>
        <Text> {item_object.name}</Text>
        <FontAwesome style={[{ marginLeft: "auto" }]} name={expanded ? "chevron-up" : "chevron-down"} />
      </View>
      {expanded && <>
        <Divider />
        {/* <Text style={styles.description_text}>{weapon.description}</Text> */}
        <ColonText before="Range" after={item_object.range?.toString() || ''} />
        <ColonText before="Strength" after={item_object.strength?.toString() || ''} />
        <Divider />
        <Text>Special Rules:</Text>
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
