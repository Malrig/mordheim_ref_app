import { Stack } from 'expo-router';

import { createStore } from "tinybase/with-schemas";
import { createIndexedDbPersister } from "tinybase/persisters/persister-indexed-db/with-schemas";
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
  useCreateStore,
  useCreateIndexes,
  useCreateRelationships,
  useCreateQueries
} from '../library/tinybase_store/ui';
import { InitialData } from '../library/tinybase_store/initial_data';

export default function RootLayout() {
  const store = useCreateStore(() => createStore().setTablesSchema(TablesSchema).setValuesSchema(ValuesSchema));
  useCreatePersister(
    store,
    (store) => {
      return createIndexedDbPersister(store, "new");
    },
    [],
    async (persister) => {
      await persister?.startAutoLoad(InitialData);
      await persister?.startAutoSave();
    }
  );

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

