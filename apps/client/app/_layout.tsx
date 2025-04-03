import { Stack } from 'expo-router';

import { createMergeableStore, MergeableStore } from "tinybase/with-schemas";
import { createIndexedDbPersister } from "tinybase/persisters/persister-indexed-db/with-schemas";
import { createLocalPersister } from "tinybase/persisters/persister-browser/with-schemas";
import {
  TablesSchema,
  ValuesSchema,
  createObjectStoreRelationships,
  createObjectStoreIndexes,
  createObjectStoreQueries
} from '../library/tinybase_store/schema';
import {
  Provider,
  useCreatePersister,
  useCreateMergeableStore,
  useCreateIndexes,
  useCreateRelationships,
  useCreateQueries,
  useCreateSynchronizer,
} from '../library/tinybase_store/ui';
import { InitialData } from '../library/tinybase_store/initial_data';
import { createWsSynchronizer } from 'tinybase/synchronizers/synchronizer-ws-client/with-schemas';
import ReconnectingWebSocket from 'reconnecting-websocket';

export default function RootLayout() {
  const store: MergeableStore<[typeof TablesSchema, typeof ValuesSchema]> = useCreateMergeableStore(
    () => createMergeableStore().setTablesSchema(TablesSchema).setValuesSchema(ValuesSchema) as MergeableStore<[typeof TablesSchema, typeof ValuesSchema]>
  );
  const wsUrl = process.env.EXPO_PUBLIC_WS_URL;
  useCreatePersister(
    store,
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
  useCreateSynchronizer(store, async (store) => {
    const synchronizer = await createWsSynchronizer(
      store,
      new ReconnectingWebSocket(wsUrl + "data_store"),
      1
    );
    await synchronizer.startSync();

    // If the websocket reconnects in the future, do another explicit sync.
    synchronizer.getWebSocket().addEventListener('open', () => {
      synchronizer.load().then(() => synchronizer.save());
    });

    return synchronizer;
  });

  const indexes = useCreateIndexes(store, (store) => {
    return createObjectStoreIndexes(store)
  });
  const relationships = useCreateRelationships(store, (store) => {
    return createObjectStoreRelationships(store);
  });
  const queries = useCreateQueries(store, (store) => {
    return createObjectStoreQueries(store);
  });

  return (
    <Provider store={store} indexes={indexes} relationships={relationships} queries={queries}>
      < Stack >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack >
    </Provider>
  );
}

