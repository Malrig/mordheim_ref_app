import { Stack } from 'expo-router';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import DataLoader from '../components/general/data_loader';
import { store as redux_store, persistor } from '../library/store/store';

import { createStore } from "tinybase/with-schemas";
import { createIndexedDbPersister } from "tinybase/persisters/persister-indexed-db/with-schemas";
import {
  TablesSchema,
  ValuesSchema,
  createObjectStoreRelationships,
  createObjectStoreIndexes
} from '../library/tinybase_store/schema';
import { 
  Provider, 
  useCreatePersister, 
  useCreateStore, 
  useCreateIndexes, 
  useCreateRelationships 
} from '../library/tinybase_store/ui';
import { InitialTableData, InitialValueData } from '../library/tinybase_store/initial_data';

export default function RootLayout() {
  const store = useCreateStore(() => createStore().setTablesSchema(TablesSchema).setValuesSchema(ValuesSchema));
  useCreatePersister(
    store,
    (store) => {
      return createIndexedDbPersister(store, "store");
    },
    [],
    async (persister) => {
      await persister?.startAutoLoad([InitialTableData, InitialValueData]);
      await persister?.startAutoSave();
    }
  );

  const indexes = useCreateIndexes(store, (store) => {
    return createObjectStoreIndexes(store)
  });
  const relationships = useCreateRelationships(store, (store) => {
    return createObjectStoreRelationships(store);
  });

  return (
    <Provider store={store} indexes={indexes} relationships={relationships}>
      <ReduxProvider store={redux_store}>
        <PersistGate loading={null} persistor={persistor}>
          <DataLoader>
            < Stack >
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack >
          </DataLoader>
        </PersistGate>
      </ReduxProvider>
    </Provider>
  );
}

