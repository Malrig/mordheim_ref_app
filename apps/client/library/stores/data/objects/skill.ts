import { useIsFavourite } from '../../user/utils/favourites';
import { DataStore } from '../interface';
import { SkillGroup } from './skill_group';

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
    const metadata = DataStore.storeUIHooks.useRemoteRowId('skillsMetadata', this.id, DataStore.useRelationships());
    const metadata_info = metadata && DataStore.storeUIHooks.useRow('metadata', metadata, DataStore.store_id) || undefined;
    return metadata_info;
  }

  useFavourite(): boolean {
    return useIsFavourite(Skill.TABLE_NAME, this.id);
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
    return Skill.fromRow(DataStore.storeUIHooks.useRow(Skill.TABLE_NAME, id, DataStore.store_id));
  }

  /**
   * Gets the skill group for this skill
   * @returns The skill group or undefined if not found
   */
  useSkillGroup(): SkillGroup | undefined {
    const skill_group_id = DataStore.storeUIHooks.useRemoteRowId(
      'skillsSkillGroup', 
      this.id, 
      DataStore.useRelationships()
    );
    return skill_group_id && SkillGroup.useInstance(skill_group_id) || undefined;
  }
  
}
