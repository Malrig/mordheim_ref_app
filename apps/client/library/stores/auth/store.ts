import { createIndexes, createMergeableStore, createRelationships, createQueries, MergeableStore, createStore } from "tinybase/with-schemas"
import {
  useProvideStore,
  useCreatePersister,
  useCreateMergeableStore,
  useCreateIndexes,
  useCreateRelationships,
  useCreateQueries,
  useStore,
  useValue,
  useCreateStore,
} from "./ui"
import { createObjectStoreIndexes, createObjectStoreRelationships, createObjectStoreQueries, TablesSchema, ValuesSchema, AuthStoreType } from "./schema"
import { supabase, getUserRoleAndPermissions } from "../../supabase";
import { createLocalPersister } from "tinybase/persisters/persister-browser/with-schemas";
import { InitialData } from "./initial_data";
import { useCallback } from "react";
import { userStore as userStoreName } from "mordheim-common";
import { Session } from "@supabase/auth-js";
import { removeUserSpecificStores } from "./utils/user_specific_stores";


export const STORE_NAME = "auth-store";

const userLoggedOutCallback = () => {
  const authStore = useStore(STORE_NAME);

  const removeStores = removeUserSpecificStores();

  return useCallback(() => {
      console.log(`User logged out`)

      removeStores();

      if (authStore){
        authStore.setValue('user_id', '');
        authStore.setValue('email', '');
        authStore.setValue('access_token', '');
        authStore.setValue('user_role', '');
        authStore.delTable("permissions");
      }
    },
    [authStore, removeStores]
  )
}

const userSignedInCallback = () => {
  const authStore = useStore(STORE_NAME);
  const user_id = useValue("user_id");

  const logoutCb = userLoggedOutCallback()

  return useCallback((user_session: Session) => {
    console.log("Sign in event")

    if (user_id && user_session.user.id && (user_id != user_session.user.id)) {
      // Use has changed or been logged out somehow, call the logout callback
      logoutCb()
    }

    if (!authStore) { console.log("No auth store"); return; }

    console.log(`User signed in: ${user_session.user.email}, ${user_session.user.id}`);
    authStore.setValue('user_id', user_session.user.id || '');
    authStore.setValue('email', user_session.user.email || '');
    authStore.setValue('access_token', user_session.access_token || '');
    const { userRole, permissions } = getUserRoleAndPermissions(user_session);

    console.log(`User role: ${userRole}`);
    console.log(`User permissions: ${JSON.stringify(permissions)}`);
    authStore.setValue('user_role', userRole);
    authStore.setTable('permissions', permissions);
  },
[logoutCb, authStore, user_id])
}

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

  const logout_cb = userLoggedOutCallback()
  const login_cb = userSignedInCallback()

  supabase.auth.onAuthStateChange((event, session) => {
    console.log(`Auth change event: ${event}, session: ${session}`)

    if (event == "SIGNED_OUT" || !session) {
      console.log("SIGNED_OUT event")
      logout_cb();
    }
    else if (["SIGNED_IN", "TOKEN_REFRESHED", "INITIAL_SESSION"].includes(event)) {
      console.log("Logged in event")
      login_cb(session)
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
export const useAuthStore = () => {
  return useStore(STORE_NAME);
}
