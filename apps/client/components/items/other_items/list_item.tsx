import { Text, View, FlatList, Pressable, StyleSheet } from "react-native";
import { Link } from 'expo-router';
import * as React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { Divider, List } from "react-native-paper";

import RichText from "../../../components/general/markdown_text";
import { Item } from "../../../library/stores/data/objects/item";
import { useSetPartialRowCallback } from "../../../library/stores/data/ui";
import Divider from "../../../components/general/divider";
import { DATA_STORE_ID } from "@/library/stores/data/store";

interface Props {
  item: { id: string }
}

export default function OtherItemListItem({ item }: Props) {
  const [expanded, setExpanded] = React.useState(false);

  const item_object = Item.useInstance(item.id);
  const metadata_info = item_object.useMetadata();
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
