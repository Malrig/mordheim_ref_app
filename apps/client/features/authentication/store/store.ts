import {
  createIndexes,
  createRelationships,
  createQueries,
  createStore,
} from 'tinybase/with-schemas';
import {
  createObjectStoreIndexes,
  createObjectStoreRelationships,
  createObjectStoreQueries,
  TablesSchema,
  ValuesSchema,
  AuthStoreType,
  AuthQueriesType,
  AuthIndexesType,
  AuthRelationshipsType,
} from './schema';
import { createLocalPersister } from 'tinybase/persisters/persister-browser/with-schemas';
import { InitialData } from './initial_data';
import * as UiReact from 'tinybase/ui-react/with-schemas';
import { supabase } from '@/features/authentication/hooks/supabase';
import {
  useUserLoggedOutCallback,
  useUserSignedInCallback,
} from '../hooks/login';
export const STORE_NAME = 'auth-store';
export const AuthUiHooks = UiReact as UiReact.WithSchemas<
  [typeof TablesSchema, typeof ValuesSchema]
>;

export const AuthStoreProvider = () => {
  const authStore: AuthStoreType = AuthUiHooks.useCreateStore(
    () =>
      createStore()
        .setTablesSchema(TablesSchema)
        .setValuesSchema(ValuesSchema) as AuthStoreType
  );
  AuthUiHooks.useProvideStore(STORE_NAME, authStore);

  AuthUiHooks.useCreatePersister(
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

  AuthUiHooks.useCreateIndexes(authStore, (store) => {
    return createObjectStoreIndexes(store);
  });
  AuthUiHooks.useCreateRelationships(authStore, (store) => {
    return createObjectStoreRelationships(store);
  });
  AuthUiHooks.useCreateQueries(authStore, (store) => {
    return createObjectStoreQueries(store);
  });

  const logout_cb = useUserLoggedOutCallback();
  const login_cb = useUserSignedInCallback();

  supabase.auth.onAuthStateChange((event, session) => {
    console.log(`Auth change event: ${event}, session: ${session}`);

    if (event == 'SIGNED_OUT' || !session) {
      console.log('SIGNED_OUT event');
      logout_cb();
    } else if (
      ['SIGNED_IN', 'TOKEN_REFRESHED', 'INITIAL_SESSION'].includes(event)
    ) {
      console.log('Logged in event');
      login_cb(session);
    }
  });

  return null;
};

export function useIsAuthStoreLoading(): boolean {
  const store = AuthUiHooks.useStore(STORE_NAME);
  return store === undefined;
}
export function useAuthStore(): AuthStoreType {
  const store = AuthUiHooks.useStore(STORE_NAME);
  return store as AuthStoreType;
}
export function AuthStoreQueries(): AuthQueriesType {
  const store = useAuthStore();
  return createQueries(store!);
}
export function AuthStoreIndexes(): AuthIndexesType {
  const store = useAuthStore();
  return createIndexes(store!);
}
export function AuthStoreRelationships(): AuthRelationshipsType {
  const store = useAuthStore();
  return createRelationships(store!);
}
