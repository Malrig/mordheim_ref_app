import { createLocalPersister } from 'tinybase/persisters/persister-browser/with-schemas';
import { MergeableStore, OptionalSchemas } from 'tinybase/with-schemas';

// On a web client, use the browser's local storage to persist the store.
export const createClientPersister = <Schemas extends OptionalSchemas>(
  store: MergeableStore<Schemas>,
  storeId: string
) => createLocalPersister(store, storeId);
