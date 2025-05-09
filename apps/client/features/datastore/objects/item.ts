import { ItemType, WeaponType } from '../enums';
import { SpecialRule } from './special_rule';
import { useIsFavourite } from '@/features/userstore/hooks/favourites';
import { DataStore } from "@/shared/stores/stores";
import { Availability, useAvailabilitiesForObject } from './availability';

/**
 * Represents a single item in the TinyBase store
 */
export class Item {
  static readonly TABLE_NAME = 'items';
  id: string;
  name: string;
  description: string;
  price: string;
  item_type: string;
  range: string;
  strength: string;
  special_rules: string; // JSON string of string[]
  weapon_type: string;

  /**
   * Creates a new Item from a TinyBase row
   * @param row The row data from TinyBase
   */
  constructor(id: string,
    name: string,
    description: string,
    price: string,
    item_type: string,
    range: string,
    strength: string,
    special_rules: string,
    weapon_type: string,
  ) {
    this.id = id || '';
    this.name = name || '';
    this.description = description || '';
    this.price = price || '';
    this.item_type = item_type || '';
    this.range = range || '';
    this.strength = strength || '';
    this.special_rules = special_rules || '[]';
    this.weapon_type = weapon_type || '';
  }

  /**
   * Gets the item type as an enum
   */
  getItemType(): ItemType {
    const validTypes = Object.values(ItemType);
    const itemTypeAsEnum = this.item_type as unknown as ItemType;
    return validTypes.includes(itemTypeAsEnum)
      ? itemTypeAsEnum
      : ItemType.MiscItem;
  }

  /**
   * Gets the weapon type as an enum
   */
  getWeaponType(): WeaponType | null {
    if (!this.weapon_type) return null;

    const validTypes = Object.values(WeaponType);
    const weaponTypeAsEnum = this.weapon_type as unknown as WeaponType;
    return validTypes.includes(weaponTypeAsEnum)
      ? weaponTypeAsEnum
      : null;
  }

  /**
   * Gets the availability as an array
   */
  useAvailabilities(): Availability[] {
    return useAvailabilitiesForObject(Item.TABLE_NAME, this.id);
  }

  /**
   * Gets the special rules as an array
   */
  getSpecialRuleIds(): string[] {
    try {
      return JSON.parse(this.special_rules);
    } catch (e) {
      return [];
    }
  }

  useMetadata(): Record<string, any> | undefined {
    const metadata = DataStore.storeUIHooks.useRemoteRowId(
      'itemsMetadata',
      this.id,
      DataStore.useRelationships()
    );

    const metadata_info = metadata && DataStore.storeUIHooks.useRow(
      'metadata',
      metadata,
      DataStore.store_id
    ) || undefined;
    return metadata_info;
  }

  useSpecialRules(): SpecialRule[] | undefined {
    // Parse the special rules as a JSON formatted list of IDs
    const specialRuleIds = JSON.parse(this.special_rules);
    const special_rules: SpecialRule[] = [];

    specialRuleIds.forEach((id: string) => {
      const specialRuleInfo = SpecialRule.useInstance(id);
      if (specialRuleInfo) {
        special_rules.push(specialRuleInfo);
      }
    });

    return special_rules;
  }

  useFavourite(): boolean {
    return useIsFavourite(Item.TABLE_NAME, this.id);
  }

  /**
   * Creates a new Item from a TinyBase row
   * @param row The row data from TinyBase
   */
  static fromRow(row: Record<string, any>): Item {
    return new Item(
      row.id || '',
      row.name || '',
      row.description || '',
      row.price || '',
      row.item_type || '',
      row.range || '',
      row.strength || '',
      row.special_rules || '[]',
      row.weapon_type || '',
    );
  }

  static useInstance(id: string): Item {
    return Item.fromRow(
      DataStore.storeUIHooks.useRow(
        Item.TABLE_NAME,
        id,
        DataStore.store_id,
      )
    );
  }
}
