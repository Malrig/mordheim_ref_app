import { DataStore } from "../interface"
import { Restriction } from "./restriction";


export function useAvailabilitiesForObject(object_table: string, object_id: string): Availability[] {
  const availabilities: Availability[] = [];
  const availabilityIds = DataStore.storeUIHooks.useSliceRowIds(
    "availabilityByObjectTypeAndId",
    `${object_table}_${object_id}`,
    DataStore.useIndexes()
  );

  availabilityIds.forEach((id) => {
    const availability = Availability.useInstance(id);
    if (availability) {
      availabilities.push(availability);
    }
  });

  return availabilities;
}

/**
 * Represents an availability in the TinyBase store
 */
export class Availability {
  static readonly TABLE_NAME = 'availabilities';
  id: string;
  rarity: number | null;
  related_object_type: string;
  object_id: string;

  /**
   * Creates a new Availability from a TinyBase row
   * @param id The ID of the availability
   * @param rarity The rarity of the availability
   * @param related_object_type The type of the related object
   * @param object_id The ID of the related object
   */
  constructor(
    id: string,
    rarity: number | null,
    related_object_type: string,
    object_id: string,
  ) {
    this.id = id || '';
    this.rarity = rarity || null;
    this.related_object_type = related_object_type || '';
    this.object_id = object_id || '';
  }

  /**
   * Creates a new Availability from a TinyBase row
   * @param row The row data from TinyBase
   */
  static fromRow(row: Record<string, any>): Availability {
    return new Availability(
      row.id || '',
      row.rarity || null,
      row.related_object_type || '',
      row.object_id || ''
    );
  }

  /**
   * Creates an Availability instance from an ID using TinyBase hooks
   * @param id The ID of the availability
   * @returns An Availability instance
   */
  static useInstance(id: string): Availability {
    return Availability.fromRow(
      DataStore.storeUIHooks.useRow(
        Availability.TABLE_NAME,
        id,
        DataStore.store_id
      )
    );
  }

  /**
   * Gets the restrictions for the availability
   * @returns An array of restrictions
   */
  useRestrictions(): Restriction[] {
    const restrictions: Restriction[] = [];
    const restrictionIds = DataStore.storeUIHooks.useLocalRowIds(
      "restrictionsAvailability",
      this.id,
      DataStore.useRelationships()
    );

    restrictionIds.forEach((id) => {
      const restriction = Restriction.useInstance(id);
      if (restriction) {
        restrictions.push(restriction);
      }
    });

    return restrictions;
  }
}