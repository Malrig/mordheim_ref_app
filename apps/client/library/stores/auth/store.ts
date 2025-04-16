import { createIndexes, createMergeableStore, createRelationships, createQueries, MergeableStore, createStore } from "tinybase/with-schemas"
import {
  useProvideStore,
  useCreatePersister,
  useCreateMergeableStore,
  useCreateIndexes,
  useCreateRelationships,
  useCreateQueries,
  useStore,
  useCreateStore,
} from "./ui"
import { createObjectStoreIndexes, createObjectStoreRelationships, createObjectStoreQueries, TablesSchema, ValuesSchema, AuthStoreType } from "./schema"
import { supabase, getUserRoleAndPermissions } from "../../supabase";
import { createLocalPersister } from "tinybase/persisters/persister-browser/with-schemas";
import { InitialData } from "./initial_data";

export const STORE_NAME = "auth-store";

export const AuthStore = () => {
  const authStore: AuthStoreType = useCreateStore(
    () => createStore().setTablesSchema(TablesSchema).setValuesSchema(ValuesSchema) as AuthStoreType
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

  supabase.auth.onAuthStateChange((event, session) => {
    if (session) {
      console.log(`User signed in: ${session.user.email}`);
      authStore.setValue('email', session.user.email || '');
      authStore.setValue('access_token', session.access_token || '');
      const { userRole, permissions } = getUserRoleAndPermissions(session);

      console.log(`User role: ${userRole}`);
      console.log(`User permissions: ${JSON.stringify(permissions)}`);
      authStore.setValue('user_role', userRole);
      authStore.setTable('permissions', permissions);
    }
    else {
      console.log('User signed out');
      authStore.setValue('email', '');
      authStore.setValue('access_token', '');
      authStore.setValue('user_role', '');
      authStore.setTable('permissions', {});
    }
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
