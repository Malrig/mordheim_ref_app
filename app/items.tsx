import { Text, View, FlatList } from "react-native";
import { Link } from 'expo-router';
import { useAppDispatch, useAppSelector } from "@/library/store/hooks";
import { fetchArmours, selectAllArmours, selectArmoursError, selectArmoursStatus } from "@/library/store/features/armourSlice";
import React from "react";
import { selectAllMiscItems, selectMiscItemsStatus, selectMiscItemsError, fetchMiscItems } from "@/library/store/features/miscItemSlice";

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

  let content: React.ReactNode

  // if (armourStatus === "pending") {
  //   content = <Text>Loading</Text>
  // } else if (armourStatus === "succeeded") {
  //   content = <>
  //     <Text>Armours List</Text>
  //     <FlatList data={armours} renderItem={({ item }) => <><ArmourListItem armour={item} /></>} />
  //   </>
  // } else if (armourStatus === "failed") {
  //   content = <Text>Loading armours failed</Text>
  // }
  
  content =
    <View>
      <Text>This is where the items would go.</Text>
    </View>;

  return (
    <View>
      {content}
    </View>
  );
}
