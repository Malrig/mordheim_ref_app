import { UserStore } from "../../features/userstore/store/interface";
export { UserStore } from "../../features/userstore/store/interface";
import { AuthStore } from "../../features/authentication/store/interface";
export { AuthStore } from "../../features/authentication/store/interface";
import { DataStore } from "../../features/datastore/store/interface";
export { DataStore } from "../../features/datastore/store/interface";

const REQUIRED_STORES = [
  AuthStore,
  UserStore,
  DataStore,
]

export function allRequiredStoresLoaded(): boolean {
  let loading = [];
  for (const store of REQUIRED_STORES) {
    const storeLoading = store.isLoading();
    loading.push(storeLoading);
    console.log(`Store ${store.store_id}: ${storeLoading}`);
  }
  return loading.every((l) => l === false);
}
