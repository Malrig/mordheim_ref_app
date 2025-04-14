import { ItemType, WeaponType } from '../../../types/items';
import { SpecialRule } from './special_rule';
import { useRemoteRowId } from '..//ui';
import { useRow } from '../ui';
import { DataStoreRelationships } from '../store';
import { DATA_STORE } from 'mordheim-common';
/**
 * Represents a single item in the TinyBase store
 */
export class Item {
  static readonly TABLE_NAME = 'items';
  id: string;
  name: string;
  description: string;
  availability: string; // JSON string of Availability[]
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
    availability: string,
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
    this.availability = availability || '[]';
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
  getAvailability(): any[] {
    try {
      return JSON.parse(this.availability);
    } catch (e) {
      return [];
    }
  }

  /**
   * Gets the special rules as an array
   */
  getSpecialRules(): string[] {
    try {
      return JSON.parse(this.special_rules);
    } catch (e) {
      return [];
    }
  }

  useMetadata(): Record<string, any> | undefined {
    const metadata = useRemoteRowId('itemsMetadata', this.id, DataStoreRelationships());

    const metadata_info = metadata && useRow('metadata', metadata, DATA_STORE) || undefined;
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

  /**
   * Creates a new Item from a TinyBase row
   * @param row The row data from TinyBase
   */
  static fromRow(row: Record<string, any>): Item {
    return new Item(
      row.id || '',
      row.name || '',
      row.description || '',
      row.availability || '[]',
      row.price || '',
      row.item_type || '',
      row.range || '',
      row.strength || '',
      row.special_rules || '[]',
      row.weapon_type || '',
    );
  }

  static useInstance(id: string): Item {
    return Item.fromRow(useRow(Item.TABLE_NAME, id, DATA_STORE));
  }
} 