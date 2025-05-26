import { generateId } from '@/shared/stores/generate_id';
import { DataStore } from '../store/interface';
import { useCallback } from 'react';
import { MetadataFormData, useUpsertMetadataCallback } from './metadata';
import { Skill } from '../objects/skill';

export interface SkillFormData {
  id: string | null;
  name: string;
  description: string;
  group_id: string;
  // No need to include the metadata ID as it's generated from the table name and object id
  metadata: Omit<MetadataFormData, 'table_name_id'>;
}

export const useUpsertSkillCallback = () => {
  const dataStore = DataStore.useStore();
  const upsertMetadataCallback = useUpsertMetadataCallback();

  return useCallback(
    (data: SkillFormData) => {
      if (dataStore) {
        if (!data.id) {
          do {
            data.id = generateId();
          } while (dataStore.getRow('skills', data.id));
        }
        dataStore.setRow('skills', data.id, {
          id: data.id,
          name: data.name,
          description: data.description,
          group_id: data.group_id,
        });
        upsertMetadataCallback({
          table_name_id: `${Skill.TABLE_NAME}_${data.id}`,
          ...data.metadata,
        });
      } else {
        console.log('No data store id');
      }
    },
    [dataStore, upsertMetadataCallback]
  );
};

export const useDeleteSkillCallback = () => {
  const dataStore = DataStore.useStore();

  return useCallback(
    (id: string) => {
      if (dataStore) {
        dataStore.delRow('skills', id);
      }
    },
    [dataStore]
  );
};
