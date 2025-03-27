
import { Text } from "react-native";
import * as React from 'react';
import { AnyItem, Armour, ItemType, MiscItem } from "@/library/types/items";
import WeaponListItem from "./weapons/list_item";
import OtherItemListItem from "./other_items/list_item";

type Props = {
  item: AnyItem
}

function ensureExhaustive(p: never): never;
function ensureExhaustive(p: AnyItem) {
  throw new Error('Unknown item type: ' + p.item_type);
}

export default function ItemListItem({ item }: Props) {
  switch (item.item_type) {
    case ItemType.Weapon:
      return <WeaponListItem weapon={item} />;
    case ItemType.Armour:
      return <OtherItemListItem item={item as Armour} />;
    case ItemType.MiscItem:
      return <OtherItemListItem item={item as MiscItem} />;
    default:
      ensureExhaustive(item);
  };
}
