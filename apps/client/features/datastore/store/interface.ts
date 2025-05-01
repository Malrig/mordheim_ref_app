import { StoreInterface } from "../../../shared/stores/store_interface";
import { TablesSchema, ValuesSchema } from "./schema";
import { STORE_NAME, DataUiHooks, useDataStore, DataStoreQueries, DataStoreIndexes, DataStoreRelationships, isDataStoreLoading } from "./store";

export const test =  DataUiHooks;

export const DataStore: StoreInterface<[typeof TablesSchema, typeof ValuesSchema]> = {
  store_id: STORE_NAME,
  useStoreId: undefined,
  isLoading: isDataStoreLoading,
  useStore: useDataStore,
  useQueries: DataStoreQueries,
  useIndexes: DataStoreIndexes,
  useRelationships: DataStoreRelationships,
  storeUIHooks: test,
}