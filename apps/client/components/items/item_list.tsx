
import * as React from 'react';
import { ItemType } from "../../library/types/enums";
import WeaponListItem from "./weapons/list_item";
import OtherItemListItem from "./other_items/list_item";

type Props = {
  item: {
    id: string,
    item_type: string,
  }
}

function ensureExhaustive(p: never): never;
function ensureExhaustive(p: ItemType) {
  throw new Error('Unknown item type: ' + p);
}

export default function ItemListItem({ item }: Props) {
  const itemTypeAsEnum = item.item_type as unknown as ItemType;

  switch (itemTypeAsEnum) {
    case ItemType.Weapon:
      return <WeaponListItem weapon={item} />;
    case ItemType.Armour:
      return <OtherItemListItem item={item} />;
    case ItemType.MiscItem:
      return <OtherItemListItem item={item} />;
    default:
      ensureExhaustive(itemTypeAsEnum);
  };
}
