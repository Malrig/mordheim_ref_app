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
import { createObjectStoreIndexes, createObjectStoreRelationships, createObjectStoreQueries, TablesSchema, ValuesSchema, UserStoreType } from "./schema"
import ReconnectingWebSocket from "reconnecting-websocket";
import { createWsSynchronizer, WebSocketTypes } from "tinybase/synchronizers/synchronizer-ws-client/with-schemas";
import { InitialData } from "./initial_data";
import { createLocalPersister, LocalPersister } from "tinybase/persisters/persister-browser/with-schemas";

import { userStore as userStoreName } from "mordheim-common";
import { useValue as authUseValue } from "../auth/ui";
import { STORE_NAME as AUTH_STORE_NAME } from "../auth/store";
import { registerUserSpecificStore } from "../auth/utils/user_specific_stores";

export const UserStore = () => {
  const user_id = authUseValue('user_id', AUTH_STORE_NAME);
  const token = authUseValue('access_token', AUTH_STORE_NAME);
  const wsUrl = process.env.EXPO_PUBLIC_WS_URL;

  const userStore: UserStoreType = useCreateMergeableStore(
    () => createMergeableStore().setTablesSchema(TablesSchema).setValuesSchema(ValuesSchema) as UserStoreType
  );

  useProvideStore(userStoreName(user_id), userStore);

  const registerStore = registerUserSpecificStore()

  useCreatePersister(
    userStore,
    (store) => {
      if (user_id === undefined || user_id === "") {
        return undefined;
      }
      return createLocalPersister(store, userStoreName(user_id));
    },
    [user_id],
    async (persister) => {
      registerStore(userStoreName(user_id));
      await persister?.startAutoLoad(InitialData);
      await persister?.startAutoSave();
    },
    [user_id]
  );

  useCreateSynchronizer(
    userStore,
    async (store) => {
      if (token && user_id) {
        console.log("Recreating synchronizer");
        const ws = new ReconnectingWebSocket(`${wsUrl}${userStoreName(user_id)}?token=${token}`, [], { debug: false });
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
    [token, user_id]
  );

  useCreateIndexes(
    userStore,
    (store) => {
      return createObjectStoreIndexes(store)
    },
    [user_id],
  );
  useCreateRelationships(userStore, (store) => {
    return createObjectStoreRelationships(store);
  });
  useCreateQueries(userStore, (store) => {
    return createObjectStoreQueries(store);
  });


  return null;
}

export const UserStoreQueries = () => {
  const store = useStore(useUserStoreId())
  if (store === undefined) {
    return undefined;
  }
  return createQueries(store);
}
export const UserStoreIndexes = () => {
  const store = useStore(useUserStoreId())
  if (store === undefined) {
    return undefined;
  }
  return createIndexes(store);
}
export const UserStoreRelationships = () => {
  const store = useStore(useUserStoreId());
  if (store === undefined) {
    return undefined;
  }
  return createRelationships(store);
}
export const useUserStoreId = () => {
  const user_id = authUseValue('user_id', AUTH_STORE_NAME);
  if (user_id) {
    return userStoreName(user_id);
  }
  else {
    return undefined;
  }
}
export const useUserStore = () => {
  const user_id = authUseValue('user_id', AUTH_STORE_NAME);
  if (user_id) {
    return useStore(userStoreName(user_id));
  }
  else {
    return undefined;
  }
}
