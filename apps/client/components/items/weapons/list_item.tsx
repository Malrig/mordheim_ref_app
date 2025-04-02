import { Text, View, FlatList, Pressable, StyleSheet } from "react-native";
import { Link } from 'expo-router';
import * as React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useAppDispatch, useAppSelector } from "../../../library/store/hooks";
import { Weapon } from "../../../library/types/items";
import { selectSpecialRulesByIds } from "../../../library/store/features/specialRulesSlice";
import Divider from "../../general/divider";
import ColonText from "../../general/colon_text";
import { itemUpdated } from "../../../library/store/features/itemsSlice";

type Props = {
  weapon: Weapon
}

export default function WeaponListItem({ weapon }: Props) {
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useAppDispatch();
  // Get the special rule details for the weapon  
  const special_rules = useAppSelector(state => selectSpecialRulesByIds(state, weapon.special_rules || []));

  const onFavouritePress = () => {
    let updatedWeapon: Weapon = { ...weapon };
    updatedWeapon.favourite = !updatedWeapon.favourite;

    dispatch(itemUpdated(updatedWeapon));
  }

  return (
    <Pressable style={styles.item} onPress={() => setExpanded(!expanded)}>
      <View style={styles.header}>
        <Pressable onPress={() => onFavouritePress()}>
          <FontAwesome name={weapon.favourite ? "heart" : "heart-o"} />
        </Pressable>
        <Text> {weapon.name}</Text>
        <FontAwesome style={[{ marginLeft: "auto" }]} name={expanded ? "chevron-up" : "chevron-down"} />
      </View>
      {expanded && <>
        <Divider />
        {/* <Text style={styles.description_text}>{weapon.description}</Text> */}
        <ColonText before="Range" after={weapon.range?.toString() || ''} />
        <ColonText before="Strength" after={weapon.strength?.toString() || ''} />
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
