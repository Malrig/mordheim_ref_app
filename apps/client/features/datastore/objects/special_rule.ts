import { DataStore } from "@/shared/stores/stores";

/**
 * Represents a special rule in the TinyBase store
 */
export class SpecialRule {
  static readonly TABLE_NAME = 'special_rules';
  id: string;
  name: string;
  description: string;

  /**
   * Creates a new SpecialRule from a TinyBase row
   * @param id The ID of the special rule
   * @param name The name of the special rule
   * @param description The description of the special rule
   */
  constructor(id: string, name: string, description: string) {
    this.id = id || '';
    this.name = name || '';
    this.description = description || '';
  }

  /**
   * Gets the metadata for this special rule
   * @returns The metadata object or undefined if not found
   */
  useMetadata(): Record<string, any> | undefined {
    const metadata = DataStore.storeUIHooks.useRemoteRowId('specialRulesMetadata', this.id, DataStore.useRelationships());
    const metadata_info = metadata && DataStore.storeUIHooks.useRow('metadata', metadata, DataStore.store_id) || undefined;
    return metadata_info;
  }

  /**
   * Creates a new SpecialRule from a TinyBase row
   * @param row The row data from TinyBase
   */
  static fromRow(row: Record<string, any>): SpecialRule {
    return new SpecialRule(
      row.id || '',
      row.name || '',
      row.description || ''
    );
  }

  /**
   * Creates a SpecialRule instance from an ID using TinyBase hooks
   * @param id The ID of the special rule
   * @returns A SpecialRule instance
   */
  static useInstance(id: string): SpecialRule {
    return SpecialRule.fromRow(DataStore.storeUIHooks.useRow(SpecialRule.TABLE_NAME, id, DataStore.store_id));
  }
}