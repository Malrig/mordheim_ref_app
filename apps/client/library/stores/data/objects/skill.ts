import { useRemoteRowId } from '../ui';
import { useRow } from '../ui';
import { DATA_STORE_ID, DataStoreRelationships } from '../store';
/**
 * Represents a skill in the TinyBase store
 */
export class Skill {
  static readonly TABLE_NAME = 'skills';
  id: string;
  name: string;
  description: string;
  group: string;

  /**
   * Creates a new Skill from a TinyBase row
   * @param id The ID of the skill
   * @param name The name of the skill
   * @param description The description of the skill
   * @param group The group the skill belongs to
   */
  constructor(id: string, name: string, description: string, group: string) {
    this.id = id || '';
    this.name = name || '';
    this.description = description || '';
    this.group = group || '';
  }

  /**
   * Gets the metadata for this skill
   * @returns The metadata object or undefined if not found
   */
  useMetadata(): Record<string, any> | undefined {
    const metadata = useRemoteRowId('skillsMetadata', this.id, DataStoreRelationships());
    const metadata_info = metadata && useRow('metadata', metadata, DATA_STORE_ID) || undefined;
    return metadata_info;
  }

  /**
   * Creates a new Skill from a TinyBase row
   * @param row The row data from TinyBase
   */
  static fromRow(row: Record<string, any>): Skill {
    return new Skill(
      row.id || '',
      row.name || '',
      row.description || '',
      row.group || ''
    );
  }

  /**
   * Creates a Skill instance from an ID using TinyBase hooks
   * @param id The ID of the skill
   * @returns A Skill instance
   */
  static useInstance(id: string): Skill {
    return Skill.fromRow(useRow(Skill.TABLE_NAME, id, DATA_STORE_ID));
  }
} 