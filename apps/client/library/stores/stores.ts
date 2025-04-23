import { UserStore } from "./user/interface";
export { UserStore } from "./user/interface";

const REQUIRED_STORES = [
  UserStore,
]


export function allRequiredStoresLoaded(): boolean {
  return REQUIRED_STORES.every((store) => !store.isLoading());
}
