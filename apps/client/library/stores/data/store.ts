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

export const DATA_STORE_ID = "data_store";

export const DataStore = () => {
  const dataStore: MergeableStore<[typeof TablesSchema, typeof ValuesSchema]> = useCreateMergeableStore(
    () => createMergeableStore().setTablesSchema(TablesSchema).setValuesSchema(ValuesSchema) as MergeableStore<[typeof TablesSchema, typeof ValuesSchema]>
  );
  useProvideStore(DATA_STORE_ID, dataStore);

  const wsUrl = process.env.EXPO_PUBLIC_WS_URL;
  useCreatePersister(
    dataStore,
    (store) => {
      // return createIndexedDbPersister(store, "new");
      return createLocalPersister(store, "data_store");
    },
    [],
    async (persister) => {
      await persister?.startAutoLoad(InitialData);
      await persister?.startAutoSave();
    }
  );
  useCreateSynchronizer(dataStore, async (store) => {
    const token = process.env.EXPO_PUBLIC_WS_TOKEN || '';
    const ws = new ReconnectingWebSocket(`${wsUrl}data_store?token=${token}`, [], { debug: false });
    const synchronizer = await createWsSynchronizer(
      store,
      ws,
      1
    );
    await synchronizer.startSync();

    // If the websocket reconnects in the future, do another explicit sync.
    synchronizer.getWebSocket().addEventListener('open', () => {
      synchronizer.load().then(() => synchronizer.save());
    });

    return synchronizer;
  });

  useCreateIndexes(dataStore, (store) => {
    return createObjectStoreIndexes(store)
  });
  useCreateRelationships(dataStore, (store) => {
    return createObjectStoreRelationships(store);
  });
  useCreateQueries(dataStore, (store) => {
    return createObjectStoreQueries(store);
  });


  return null;
}

export const DataStoreQueries = () => {
  return createQueries(useStore("data_store")!);
}
export const DataStoreIndexes = () => {
  return createIndexes(useStore("data_store")!);
}
export const DataStoreRelationships = () => {
  return createRelationships(useStore("data_store")!);
}
