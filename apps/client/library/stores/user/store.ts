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
import { createLocalPersister } from "tinybase/persisters/persister-browser/with-schemas";

import { userStore as userStoreName } from "mordheim-common";
import { useValue as authUseValue } from "../auth/ui";
import { STORE_NAME as AUTH_STORE_NAME } from "../auth/store";

export const UserStore = () => {
  const userStore: UserStoreType = useCreateMergeableStore(
    () => createMergeableStore().setTablesSchema(TablesSchema).setValuesSchema(ValuesSchema) as UserStoreType
  );

  const wsUrl = process.env.EXPO_PUBLIC_WS_URL;

  const user_id = authUseValue('user_id', AUTH_STORE_NAME);
  const token = authUseValue('access_token', AUTH_STORE_NAME);

  useProvideStore(userStoreName(user_id), userStore);

  // TODO: Need to delete local data when user_id changes
  useCreatePersister(
    userStore,
    (store) => {
      return createLocalPersister(store, userStoreName(user_id));
    },
    [user_id],
    async (persister) => {
      await persister?.startAutoLoad(InitialData);
      await persister?.startAutoSave();
    }
  );

  useCreateSynchronizer(
    userStore,
    async (store) => {
      if (token) {
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

  useCreateIndexes(userStore, (store) => {
    return createObjectStoreIndexes(store)
  },
[user_id]);
  useCreateRelationships(userStore, (store) => {
    return createObjectStoreRelationships(store);
  });
  useCreateQueries(userStore, (store) => {
    return createObjectStoreQueries(store);
  });


  return null;
}

export const UserStoreQueries = () => {
  const user_id = authUseValue('user_id', AUTH_STORE_NAME);
  return createQueries(useStore(userStoreName(user_id))!);
}
export const UserStoreIndexes = () => {
  const user_id = authUseValue('user_id', AUTH_STORE_NAME);
  return createIndexes(useStore(userStoreName(user_id))!);
}
export const DataUserStoreRelationships = () => {
  const user_id = authUseValue('user_id', AUTH_STORE_NAME);
  return createRelationships(useStore(userStoreName(user_id))!);
}
