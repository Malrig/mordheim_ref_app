import { createIndexes, createMergeableStore, createRelationships, createQueries, MergeableStore } from "tinybase/with-schemas"
import { createObjectStoreIndexes, createObjectStoreRelationships, createObjectStoreQueries, TablesSchema, ValuesSchema, DataStoreType, DataQueriesType, DataIndexesType, DataRelationshipsType } from "./schema"
import ReconnectingWebSocket from "reconnecting-websocket";
import { createWsSynchronizer, WebSocketTypes } from "tinybase/synchronizers/synchronizer-ws-client/with-schemas";
import { InitialData } from "./initial_data";
import { createLocalPersister } from "tinybase/persisters/persister-browser/with-schemas";

export { DATA_STORE as STORE_NAME } from "mordheim-common";
import { DATA_STORE as STORE_NAME } from "mordheim-common";
import { AuthStore } from "@/features/authentication/store/interface";
import * as UiReact from "tinybase/ui-react/with-schemas";

export const DataUiHooks = UiReact as UiReact.WithSchemas<
  [typeof TablesSchema, typeof ValuesSchema]
>;

export const DataStoreProvider = () => {
  const dataStore: DataStoreType = DataUiHooks.useCreateMergeableStore(
    () => createMergeableStore().setTablesSchema(TablesSchema).setValuesSchema(ValuesSchema) as DataStoreType
  );
  DataUiHooks.useProvideStore(STORE_NAME, dataStore);

  const wsUrl = process.env.EXPO_PUBLIC_WS_URL;
  DataUiHooks.useCreatePersister(
    dataStore,
    (store) => {
      return createLocalPersister(store, STORE_NAME);
    },
    [],
    async (persister) => {
      await persister?.startAutoLoad(InitialData);
      await persister?.startAutoSave();
    }
  );

  const token = AuthStore.storeUIHooks.useValue('access_token', AuthStore.store_id);

  DataUiHooks.useCreateSynchronizer(
    dataStore,
    async (store) => {
      if (token) {
        console.log("Recreating synchronizer");
        const ws = new ReconnectingWebSocket(`${wsUrl}${STORE_NAME}?token=${token}`, [], { debug: false });
        const synchronizer = await createWsSynchronizer(
          store,
          ws as unknown as WebSocketTypes,
          1
        );
        await synchronizer.startSync();

        // If the websocket reconnects in the future, do another explicit sync.
        synchronizer.getWebSocket().addEventListener('open', () => {
          synchronizer.load().then(() => synchronizer.save());
        });

        return synchronizer;
      }
      else {
        return undefined;
      }
    },
    [token]
  );

  DataUiHooks.useCreateIndexes(dataStore, (store) => {
    return createObjectStoreIndexes(store)
  });
  DataUiHooks.useCreateRelationships(dataStore, (store) => {
    return createObjectStoreRelationships(store);
  });
  DataUiHooks.useCreateQueries(dataStore, (store) => {
    return createObjectStoreQueries(store);
  });


  return null;
}

export function isDataStoreLoading(): boolean {
  const store = DataUiHooks.useStore(STORE_NAME);
  return store === undefined;
}
export function useDataStore(): DataStoreType {
  const store = DataUiHooks.useStore(STORE_NAME);
  return store as DataStoreType;
}
export function DataStoreQueries(): DataQueriesType {
  const store = useDataStore();
  return createQueries(store!);
}
export function DataStoreIndexes(): DataIndexesType {
  const store = useDataStore();
  return createIndexes(store!);
}
export function DataStoreRelationships(): DataRelationshipsType {
  const store = useDataStore();
  return createRelationships(store!);
}
