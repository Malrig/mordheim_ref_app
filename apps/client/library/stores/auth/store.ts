import { createIndexes, createMergeableStore, createRelationships, createQueries, MergeableStore } from "tinybase/with-schemas"
import {
  useProvideStore,
  useCreatePersister,
  useCreateMergeableStore,
  useCreateIndexes,
  useCreateRelationships,
  useCreateQueries,
  useCreateSynchronizer,
  useStore,
} from "./ui"
import { createObjectStoreIndexes, createObjectStoreRelationships, createObjectStoreQueries, TablesSchema, ValuesSchema } from "./schema"
import ReconnectingWebSocket from "reconnecting-websocket";
import { createWsSynchronizer } from "tinybase/synchronizers/synchronizer-ws-client/with-schemas";
import { InitialData } from "./initial_data";
import { createLocalPersister } from "tinybase/persisters/persister-browser/with-schemas";

export const STORE_NAME = "auth-store";

export const AuthStore = () => {
  const authStore: MergeableStore<[typeof TablesSchema, typeof ValuesSchema]> = useCreateMergeableStore(
    () => createMergeableStore().setTablesSchema(TablesSchema).setValuesSchema(ValuesSchema) as MergeableStore<[typeof TablesSchema, typeof ValuesSchema]>
  );
  useProvideStore(STORE_NAME, authStore);

  useCreatePersister(
    authStore,
    (store) => {
      return createLocalPersister(store, STORE_NAME);
    },
    [],
    async (persister) => {
      await persister?.startAutoLoad(InitialData);
      await persister?.startAutoSave();
    }
  );

  useCreateIndexes(authStore, (store) => {
    return createObjectStoreIndexes(store)
  });
  useCreateRelationships(authStore, (store) => {
    return createObjectStoreRelationships(store);
  });
  useCreateQueries(authStore, (store) => {
    return createObjectStoreQueries(store);
  });

  return null;
}

export const AuthStoreQueries = () => {
  return createQueries(useStore(STORE_NAME)!);
}
export const AuthStoreIndexes = () => {
  return createIndexes(useStore(STORE_NAME)!);
}
export const AuthStoreRelationships = () => {
  return createRelationships(useStore(STORE_NAME)!);
}
