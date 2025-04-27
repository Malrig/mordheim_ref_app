import { WeaponType, ItemType } from "@/library/types/enums"
import { Metadata } from "@/library/data/data_interfaces/metadata"
import { Availability } from "@/library/data/data_interfaces/availability"

export interface SpecialRule {
  id: string
  name: string
  description: string
}

interface ItemInterface extends Metadata {
  name: string
  description: string
  availability: Availability[]
  price: string
  item_type: ItemType
  // Fields specific to weapons
  range: string | null
  strength: string | null
  special_rules: string[] | null // List of IDs of special rules they relate to. 
  weapon_type: WeaponType | null
}

export type Item = ItemInterface;

export type Weapon = Omit<ItemInterface, 'range' | 'strength' | 'special_rules' | 'weapon_type'> & Required<Pick<ItemInterface, 'range' | 'strength' | 'special_rules' | 'weapon_type'>>;

export type Armour = Omit<ItemInterface, 'range' | 'strength' | 'special_rules' | 'weapon_type' | 'item_type'> & {
  range: null;
  strength: null;
  special_rules: null;
  weapon_type: null;
  item_type: ItemType.Armour;
};

export type MiscItem = Omit<ItemInterface, 'range' | 'strength' | 'special_rules' | 'weapon_type' | 'item_type'> & {
  range: null;
  strength: null;
  special_rules: null;
  weapon_type: null;
  item_type: ItemType.MiscItem;
};

export type AnyItem = Armour | MiscItem | Weapon
