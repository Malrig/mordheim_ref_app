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
import { createObjectStoreIndexes, createObjectStoreRelationships, createObjectStoreQueries, TablesSchema, ValuesSchema, DataStoreType } from "./schema"
import ReconnectingWebSocket from "reconnecting-websocket";
import { createWsSynchronizer, WebSocketTypes } from "tinybase/synchronizers/synchronizer-ws-client/with-schemas";
import { InitialData } from "./initial_data";
import { createLocalPersister } from "tinybase/persisters/persister-browser/with-schemas";

import { DATA_STORE } from "mordheim-common";
import { useValue as authUseValue } from "../auth/ui";
import { STORE_NAME as AUTH_STORE_NAME } from "../auth/store";

export const DataStore = () => {
  const dataStore: DataStoreType = useCreateMergeableStore(
    () => createMergeableStore().setTablesSchema(TablesSchema).setValuesSchema(ValuesSchema) as DataStoreType
  );
  useProvideStore(DATA_STORE, dataStore);

  const wsUrl = process.env.EXPO_PUBLIC_WS_URL;
  useCreatePersister(
    dataStore,
    (store) => {
      return createLocalPersister(store, DATA_STORE);
    },
    [],
    async (persister) => {
      await persister?.startAutoLoad(InitialData);
      await persister?.startAutoSave();
    }
  );

  const token = authUseValue('access_token', AUTH_STORE_NAME);

  useCreateSynchronizer(
    dataStore,
    async (store) => {
      if (token) {
        console.log("Recreating synchronizer");
        const ws = new ReconnectingWebSocket(`${wsUrl}${DATA_STORE}?token=${token}`, [], { debug: false });
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
  return createQueries(useStore(DATA_STORE)!);
}
export const DataStoreIndexes = () => {
  return createIndexes(useStore(DATA_STORE)!);
}
export const DataStoreRelationships = () => {
  return createRelationships(useStore(DATA_STORE)!);
}
