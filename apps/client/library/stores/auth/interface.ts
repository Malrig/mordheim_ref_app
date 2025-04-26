import { StoreInterface } from "../store_interface";
import { TablesSchema, ValuesSchema } from "./schema";
import { STORE_NAME, AuthUiHooks, useAuthStore, AuthStoreQueries, AuthStoreIndexes, AuthStoreRelationships, isAuthStoreLoading } from "./store";

export const AuthStore: StoreInterface<[typeof TablesSchema, typeof ValuesSchema]> = {
  store_id: STORE_NAME,
  useStoreId: undefined,
  isLoading: isAuthStoreLoading,
  useStore: useAuthStore,
  useQueries: AuthStoreQueries,
  useIndexes: AuthStoreIndexes,
  useRelationships: AuthStoreRelationships,
  storeUIHooks: AuthUiHooks,
}