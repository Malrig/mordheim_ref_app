import { DataStore } from "../store/interface";

/**
 * Represents an availability in the TinyBase store
 */
export class Restriction {
  static readonly TABLE_NAME = 'restrictions';
  id: string;
  restriction_type: string;
  restriction: string;
  availability_id: string;

  /**
   * Creates a new Restriction from a TinyBase row
   * @param id The ID of the restriction
   * @param restriction_type The type of the restriction
   * @param restriction The restriction
   * @param availability_id The ID of the availability
   */
  constructor(
    id: string,
    restriction_type: string,
    restriction: string,
    availability_id: string,
  ) {
    this.id = id || '';
    this.restriction_type = restriction_type || '';
    this.restriction = restriction || '';
    this.availability_id = availability_id || '';
  }

  /**
   * Creates a new Restriction from a TinyBase row
   * @param row The row data from TinyBase
   */
  static fromRow(row: Record<string, any>): Restriction {
    return new Restriction(
      row.id || '',
      row.restriction_type || '',
      row.restriction || '',
      row.availability_id || ''
    );
  }

  /**
   * Creates an Restriction instance from an ID using TinyBase hooks
   * @param id The ID of the restriction
   * @returns An Restriction instance
   */
  static useInstance(id: string): Restriction {
    return Restriction.fromRow(
      DataStore.storeUIHooks.useRow(
        Restriction.TABLE_NAME,
        id,
        DataStore.store_id
      )
    );
  }
}