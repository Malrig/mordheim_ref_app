import { generateId } from '@/shared/stores/generate_id';
import { DataStore } from '../store/interface';
import { useCallback } from 'react';
import { MetadataFormData, useUpsertMetadataCallback } from './metadata';
import { Item } from '../objects/item';
import { ItemType, WeaponType } from '../enums';

export interface ItemFormData {
  id: string | null;
  name: string;
  description: string;
  price: string;
  item_type: ItemType;
  range: string;
  strength: string;
  special_rules: string[];
  weapon_type: WeaponType | null;
  metadata: Omit<MetadataFormData, 'table_name_id'>;
}

export const useUpsertItemCallback = () => {
  const dataStore = DataStore.useStore();
  const upsertMetadataCallback = useUpsertMetadataCallback();

  return useCallback(
    (data: ItemFormData) => {
      if (dataStore) {
        if (!data.id) {
          do {
            data.id = generateId();
          } while (dataStore.getRow('items', data.id));
        }
        dataStore.setRow('items', data.id, {
          id: data.id,
          name: data.name,
          description: data.description,
          price: data.price,
          item_type: data.item_type,
          range: data.range,
          strength: data.strength,
          special_rules: JSON.stringify(data.special_rules),
          weapon_type: data.weapon_type || '',
        });
        upsertMetadataCallback({
          table_name_id: `${Item.TABLE_NAME}_${data.id}`,
          ...data.metadata,
        });
      } else {
        console.log('No data store id');
      }
    },
    [dataStore, upsertMetadataCallback]
  );
};

export const useDeleteItemCallback = () => {
  const dataStore = DataStore.useStore();

  return useCallback(
    (id: string) => {
      if (dataStore) {
        dataStore.delRow('items', id);
      }
    },
    [dataStore]
  );
};
