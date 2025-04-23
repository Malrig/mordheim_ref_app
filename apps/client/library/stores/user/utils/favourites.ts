import { UserStore } from "../interface";
import { useCallback } from "react";

export function useIsFavourite(object_table: string, object_id: string) {
  const favourite = UserStore.storeUIHooks.useSliceRowIds("by_object_table_and_id", `${object_table}_${object_id}`, UserStore.useIndexes());

  return favourite.length > 0;
}

const addFavouriteCallback = (object_table: string, object_id: string) => {
  const userStore = UserStore.useStore();

  const addRow = userStore ? (object_table: string, object_id: string) => {
    userStore.setRow("favourites", `${object_table}_${object_id}`, {
      object_table: object_table,
      object_id: object_id,
    });
  } : () => {console.log("No user store id")};

  return useCallback(() => {
    addRow(object_table, object_id);
  }, [addRow, object_table, object_id]);
}

const removeFavouriteCallback = (object_table: string, object_id: string) => {
  const userStore = UserStore.useStore();

  const removeRow = userStore ? (object_table: string, object_id: string) => {
    userStore.delRow("favourites", `${object_table}_${object_id}`);
  } : () => {console.log("No user store id")};

  return useCallback(() => {
    removeRow(object_table, object_id);
  }, [removeRow, object_table, object_id]);
}

export const toggleFavouriteCallback = (object_table: string, object_id: string) => {
  const is_favourite = useIsFavourite(object_table, object_id);

  const removeCallback = removeFavouriteCallback(object_table, object_id);
  const addCallback = addFavouriteCallback(object_table, object_id)

  return useCallback(() => {
    if (is_favourite) {
      console.debug(`Remove favourite for ${object_table}, ${object_id}`)
      removeCallback();
    }
    else {
      console.debug(`Add favourite for ${object_table}, ${object_id}`)
      addCallback();
    }
  }, [is_favourite, removeCallback, addCallback])

}