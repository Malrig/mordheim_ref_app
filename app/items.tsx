import { Text, View, FlatList, ScrollView } from "react-native";
import { Link } from 'expo-router';
import { useAppDispatch, useAppSelector } from "@/library/store/hooks";
import { fetchArmours, selectAllArmours, selectArmoursError, selectArmoursStatus } from "@/library/store/features/armoursSlice";
import React from "react";
import { selectAllMiscItems, selectMiscItemsStatus, selectMiscItemsError, fetchMiscItems } from "@/library/store/features/miscItemsSlice";
import { fetchWeapons, selectAllWeapons, selectWeaponsError, selectWeaponsStatus } from "@/library/store/features/weaponSlice";
import WeaponListItem from "@/components/weapons/list_item";
import { fetchSpecialRules, selectSpecialRulesStatus } from "@/library/store/features/specialRulesSlice";

// What does this page do?
// - Display all items available in the campaign.
//   - Split by type (e.g. melee weapon, ranged weapon, etc).
//   - Include special rules (special rules should be separate entities by reference).
// - People should be able to "favourite" items and they appear in the quick reference sheet.

export default function Items() {
  const dispatch = useAppDispatch();
  const armours = useAppSelector(selectAllArmours);
  const armourStatus = useAppSelector(selectArmoursStatus);
  const armoursError = useAppSelector(selectArmoursError);

  React.useEffect(() => {
    if (armourStatus === 'idle') {
      dispatch(fetchArmours())
    }
  }, [armourStatus, dispatch])

  const miscItems = useAppSelector(selectAllMiscItems);
  const miscItemStatus = useAppSelector(selectMiscItemsStatus);
  const miscItemsError = useAppSelector(selectMiscItemsError);

  React.useEffect(() => {
    if (miscItemStatus === 'idle') {
      dispatch(fetchMiscItems())
    }
  }, [miscItemStatus, dispatch])

  const weapons = useAppSelector(selectAllWeapons);
  const weaponsStatus = useAppSelector(selectWeaponsStatus);
  const weaponsError = useAppSelector(selectWeaponsError);

  React.useEffect(() => {
    if (weaponsStatus === 'idle') {
      dispatch(fetchWeapons())
    }
  }, [weaponsStatus, dispatch])

  const specialRuleStatus = useAppSelector(selectSpecialRulesStatus);

  React.useEffect(() => {
    if (weaponsStatus === 'idle') {
      dispatch(fetchSpecialRules())
    }
  }, [selectSpecialRulesStatus, dispatch])

  let content: React.ReactNode

  if (weaponsStatus === "pending") {
    content = <Text>Loading</Text>
  } else if (weaponsStatus === "succeeded") {
    content = <>
      <Text>Weapons List</Text>
      <FlatList contentContainerStyle={{
        flexGrow: 1,
      }} data={weapons} renderItem={({ item }) => <><WeaponListItem weapon={item} /></>} />
    </>

  } else if (weaponsStatus === "failed") {
    content = <Text>Loading weapons failed</Text>
  }

  return (
    <View style={{ flex: 1 }}>
      {content}
    </View>
  );
}
