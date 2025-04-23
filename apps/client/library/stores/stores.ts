import { UserStore } from "./user/interface";
export { UserStore } from "./user/interface";
import { AuthStore } from "./auth/interface";
export { AuthStore } from "./auth/interface";
import { DataStore } from "./data/interface";
export { DataStore } from "./data/interface";

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
