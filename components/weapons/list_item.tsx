import { Text, View, FlatList, Pressable } from "react-native";
import { Link } from 'expo-router';
import * as React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { Divider, List } from "react-native-paper";

import { Skill } from '@/library/types/skills';
import { useAppDispatch, useAppSelector } from "@/library/store/hooks";
import { skillUpdated } from "@/library/store/features/skillsSlice";
import { Weapon } from "@/library/types/items";
import { weaponUpdated } from "@/library/store/features/weaponSlice";
import { selectSpecialRulesByIds } from "@/library/store/features/specialRulesSlice";

type Props = {
  weapon: Weapon
}

export default function WeaponListItem({ weapon }: Props) {
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useAppDispatch();

  // Get the special rule details for the weapon  
  const special_rules = useAppSelector(state => selectSpecialRulesByIds(state, weapon.special_rules));

  const onFavouritePress = () => {
    let updatedWeapon: Weapon = { ...weapon };
    updatedWeapon.favourite = !updatedWeapon.favourite;

    dispatch(weaponUpdated(updatedWeapon));
  }

  return (
    <View>
      <View style={[{ flexDirection: 'row', }]}>
        <Pressable style={[{ flexDirection: 'row', }]} onPress={() => setExpanded(!expanded)}>
          <FontAwesome name={expanded ? "chevron-up" : "chevron-down"} />
          <Text>{weapon.name}</Text>
        </Pressable>
        <View style={[{ marginLeft: "auto" }]}>
          <Pressable style={[{ flexDirection: 'row', }]} onPress={() => onFavouritePress()}>
            <FontAwesome name={weapon.favourite ? "heart" : "heart-o"} />
          </Pressable>
        </View>
      </View>
      {expanded && <>
        <Text>{weapon.description}</Text>
        <Text>Range: {weapon.range}</Text>
        <Text>Strength: {weapon.strength}</Text>
        <Text>Special Rules:</Text>
        <FlatList data={special_rules} renderItem={({ item }) => <>
          <Text>{item.name}: {item.description}</Text>
        </>} />
      </>}
    </View>
  );
}
