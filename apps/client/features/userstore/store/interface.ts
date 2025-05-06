import { StoreInterface } from "@/shared/stores/store_interface";
import { TablesSchema, ValuesSchema } from "./schema";
import { UserUiHooks, useUserStoreId, useUserStore, UserStoreQueries, UserStoreIndexes, UserStoreRelationships, isUserStoreLoading } from "./store";

export const UserStore: StoreInterface<[typeof TablesSchema, typeof ValuesSchema]> = {
  store_id: undefined,
  useStoreId: useUserStoreId,
  isLoading: isUserStoreLoading,
  useStore: useUserStore,
  useQueries: UserStoreQueries,
  useIndexes: UserStoreIndexes,
  useRelationships: UserStoreRelationships,
  storeUIHooks: UserUiHooks,
}