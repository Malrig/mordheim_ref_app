import { ItemType, WeaponType } from "../../library/types/enums";
import ItemListItem from "./item_list";
import { SectionedList } from "../general/sectioned_list";
import { ThemedText, ThemedView } from "../general/themed_components";


interface ItemSection {
  title: string;
  data: ItemObject[];
  sectionKey: string;
};

interface ItemObject {
  id: string,
  item_type: string,
  weapon_type: string | null,
}

type Props = {
  items: ItemObject[]
}

export default function SectionedItemList({ items }: Props) {
  const sections: ItemSection[] = [
    {
      title: "Melee Weapons",
      data: items.filter(item => item.item_type === ItemType.Weapon && item.weapon_type === WeaponType.Melee),
      sectionKey: `${ItemType.Weapon}_${WeaponType.Melee}`
    },
    {
      title: "Ranged Weapons",
      data: items.filter(item => item.item_type === ItemType.Weapon && item.weapon_type === WeaponType.Ranged),
      sectionKey: `${ItemType.Weapon}_${WeaponType.Ranged}`
    },
    {
      title: "Blackpowder Weapons",
      data: items.filter(item => item.item_type === ItemType.Weapon && item.weapon_type === WeaponType.Blackpowder),
      sectionKey: `${ItemType.Weapon}_${WeaponType.Blackpowder}`
    },
    {
      title: "Armour",
      data: items.filter(item => item.item_type === ItemType.Armour),
      sectionKey: `${ItemType.Armour}_${null}`
    },
    {
      title: "Miscellaneous Items",
      data: items.filter(item => item.item_type === ItemType.MiscItem),
      sectionKey: `${ItemType.MiscItem}_${null}`
    }
  ];

  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      <SectionedList<ItemObject> sections={sections} renderItem={({ item }: { item: ItemObject }) => <ItemListItem item={item} />}/>
    </ThemedView>
  );
}