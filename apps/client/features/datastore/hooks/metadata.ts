import { DataStore } from '../store/interface';
import { useCallback } from 'react';

export interface MetadataFormData {
  table_name_id: string;
  source: string;
  source_type: string;
}

export const useUpsertMetadataCallback = () => {
  const dataStore = DataStore.useStore();

  return useCallback(
    (data: MetadataFormData) => {
      if (dataStore) {
        dataStore.setRow('metadata', data.table_name_id, {
          table_name_id: data.table_name_id,
          source: data.source,
          source_type: data.source_type,
        });
      } else {
        console.log('No data store id');
      }
    },
    [dataStore]
  );
};

export const useDeleteMetadataCallback = () => {
  const dataStore = DataStore.useStore();

  return useCallback(
    (table_name_id: string) => {
      if (dataStore) {
        dataStore.delRow('metadata', table_name_id);
      }
    },
    [dataStore]
  );
};
