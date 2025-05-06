import { AuthStore } from "../store/interface";
import { useCallback } from "react";

export const registerUserSpecificStore = () => {
  const authStore = AuthStore.useStore()

  const addRow = authStore ? (store_name: string) => {
    authStore.setRow("user_specific_stores", store_name, {
      store_name: store_name,
    });
  } : () => {console.log("No auth store setup.")};

  return useCallback((store_name: string) => {
    console.log(`Register user-specific store ${store_name}`)
    addRow(store_name)
  }, [addRow])
}

export const unregisterUserSpecificStores = () => {
  const authStore = AuthStore.useStore()

  const delRow = authStore ? (store_name: string) => {
    authStore.delRow("user_specific_stores", store_name);
  } : () => {console.log("No auth store setup")};

  return useCallback((store_name: string) => {
    console.log(`Unregister user-specific store ${store_name}`)
    delRow(store_name)
  }, [delRow])

}

export const removeUserSpecificStores = () => {
  const userSpecificStores = AuthStore.storeUIHooks.useRowIds("user_specific_stores", AuthStore.store_id)

  const unregisterStore = unregisterUserSpecificStores()

  return useCallback(() => {
    console.log("Removing all user specific stores.")
    console.log(userSpecificStores)

    userSpecificStores.forEach((store) => {
      console.log(`Remove store ${store}`)
      localStorage.removeItem(store);
      unregisterStore(store);
    });
  }, [unregisterStore, userSpecificStores])

}