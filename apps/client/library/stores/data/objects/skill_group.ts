import { DataStore } from "../interface"
import { Availability, useAvailabilitiesForObject } from "./availability";

/**
 * Represents an availability in the TinyBase store
 */
export class SkillGroup {
  static readonly TABLE_NAME = 'skill_groups';
  id: string;
  name: string;

  /**
   * Creates a new Restriction from a TinyBase row
   * @param id The ID of the restriction
   * @param restriction_type The type of the restriction
   * @param restriction The restriction
   * @param availability_id The ID of the availability
   */
  constructor(
    id: string,
    name: string,
  ) {
    this.id = id || '';
    this.name = name || '';
  }

  /**
   * Creates a new Restriction from a TinyBase row
   * @param row The row data from TinyBase
   */
  static fromRow(row: Record<string, any>): SkillGroup {
    return new SkillGroup(
      row.id || '',
      row.name || ''
    );
  }

  /**
   * Creates an Restriction instance from an ID using TinyBase hooks
   * @param id The ID of the restriction
   * @returns An Restriction instance
   */
  static useInstance(id: string): SkillGroup {
    return SkillGroup.fromRow(
      DataStore.storeUIHooks.useRow(
        SkillGroup.TABLE_NAME,
        id,
        DataStore.store_id
      )
    );
  }

  useAvailabilities(): Availability[] {
    return useAvailabilitiesForObject(
      SkillGroup.TABLE_NAME,
      this.id
    );
  }
}