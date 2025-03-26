import { Availability, ItemType, WeaponType } from "./items"
import { SourceStatus } from "./metadata"
import { Skill } from "./skills"

export interface NewMetadata {
  id: string
  favourite: boolean
  source: string
  source_type: SourceStatus
}

interface NewItemInterface extends NewMetadata {
  name: string
  description: string
  availability: Availability
  price: string
  item_type: ItemType
  // Fields specific to weapons
  range: string | null
  strength: string | null
  special_rules: string[] | null // List of IDs of special rules they relate to. 
  weapon_type: WeaponType | null
}

export type NewItem = NewItemInterface;

export type NewWeapon = Omit<NewItemInterface, 'range' | 'strength' | 'special_rules' | 'weapon_type'> & Required<Pick<NewItemInterface, 'range' | 'strength' | 'special_rules' | 'weapon_type'>>;

export type NewArmour = Omit<NewItemInterface, 'range' | 'strength' | 'special_rules' | 'weapon_type' | 'item_type'> & {
  range: null;
  strength: null;
  special_rules: null;
  weapon_type: null;
  item_type: ItemType.Armour;
};

export type NewMiscItem = Omit<NewItemInterface, 'range' | 'strength' | 'special_rules' | 'weapon_type' | 'item_type'> & {
  range: null;
  strength: null;
  special_rules: null;
  weapon_type: null;
  item_type: ItemType.MiscItem;
};
