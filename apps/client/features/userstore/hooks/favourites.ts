import { UserStore } from '../store/interface';
import { useCallback, useMemo } from 'react';

export function useIsFavourite(object_table: string, object_id: string) {
  const favourite = UserStore.storeUIHooks.useSliceRowIds(
    'by_object_table_and_id',
    `${object_table}_${object_id}`,
    UserStore.useIndexes()
  );

  return favourite.length > 0;
}

const useAddFavouriteCallback = (object_table: string, object_id: string) => {
  const userStore = UserStore.useStore();

  return useCallback(() => {
    if (userStore) {
      userStore.setRow('favourites', `${object_table}_${object_id}`, {
        object_table: object_table,
        object_id: object_id,
      });
    } else {
      console.log('No user store id');
    }
  }, [userStore, object_table, object_id]);
};

const useRemoveFavouriteCallback = (
  object_table: string,
  object_id: string
) => {
  const userStore = UserStore.useStore();

  const removeRow = useMemo(
    () =>
      userStore
        ? (inner_object_table: string, inner_object_id: string) => {
            userStore.delRow(
              'favourites',
              `${inner_object_table}_${inner_object_id}`
            );
          }
        : () => {
            console.log('No user store id');
          },
    [userStore]
  );

  return useCallback(() => {
    removeRow(object_table, object_id);
  }, [removeRow, object_table, object_id]);
};

export const useToggleFavouriteCallback = (
  object_table: string,
  object_id: string
) => {
  const is_favourite = useIsFavourite(object_table, object_id);

  const removeCallback = useRemoveFavouriteCallback(object_table, object_id);
  const addCallback = useAddFavouriteCallback(object_table, object_id);

  return useCallback(() => {
    if (is_favourite) {
      console.debug(`Remove favourite for ${object_table}, ${object_id}`);
      removeCallback();
    } else {
      console.debug(`Add favourite for ${object_table}, ${object_id}`);
      addCallback();
    }
  }, [is_favourite, removeCallback, addCallback, object_table, object_id]);
};
