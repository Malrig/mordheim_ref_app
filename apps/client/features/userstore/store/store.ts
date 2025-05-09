import {
  createIndexes,
  createMergeableStore,
  createRelationships,
  createQueries,
} from 'tinybase/with-schemas';
import {
  createObjectStoreIndexes,
  createObjectStoreRelationships,
  createObjectStoreQueries,
  TablesSchema,
  ValuesSchema,
  UserStoreType,
  UserQueriesType,
  UserIndexesType,
  UserRelationshipsType,
} from './schema';
import ReconnectingWebSocket from 'reconnecting-websocket';
import {
  createWsSynchronizer,
  WebSocketTypes,
} from 'tinybase/synchronizers/synchronizer-ws-client/with-schemas';
import { InitialData } from './initial_data';
import { createLocalPersister } from 'tinybase/persisters/persister-browser/with-schemas';
import * as UiReact from 'tinybase/ui-react/with-schemas';

import { userStore as userStoreName } from 'mordheim-common';
import { AuthStore } from '@/features/authentication/store/interface';
import { useRegisterUserSpecificStore } from '@/features/authentication/hooks/user_specific_stores';

export const UserUiHooks = UiReact as UiReact.WithSchemas<
  [typeof TablesSchema, typeof ValuesSchema]
>;

export const UserStoreProvider = () => {
  const user_id = authUseValue('user_id', AuthStore.store_id);
  const token = authUseValue('access_token', AuthStore.store_id);
  const wsUrl = process.env.EXPO_PUBLIC_WS_URL;

  const userStore: UserStoreType = UserUiHooks.useCreateMergeableStore(
    () =>
      createMergeableStore()
        .setTablesSchema(TablesSchema)
        .setValuesSchema(ValuesSchema) as UserStoreType
  );

  UserUiHooks.useProvideStore(userStoreName(user_id), userStore);

  const registerStore = useRegisterUserSpecificStore();

  UserUiHooks.useCreatePersister(
    userStore,
    (store) => {
      if (user_id === undefined || user_id === '') {
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

  UserUiHooks.useCreateSynchronizer(
    userStore,
    async (store) => {
      if (token && user_id) {
        console.log('Recreating synchronizer');
        const ws = new ReconnectingWebSocket(
          `${wsUrl}${userStoreName(user_id)}?token=${token}`,
          [],
          { debug: false }
        );
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
      } else {
        return undefined;
      }
    },
    [token, user_id]
  );

  UserUiHooks.useCreateIndexes(
    userStore,
    (store) => {
      return createObjectStoreIndexes(store);
    },
    [user_id]
  );
  UserUiHooks.useCreateRelationships(userStore, (store) => {
    return createObjectStoreRelationships(store);
  });
  UserUiHooks.useCreateQueries(userStore, (store) => {
    return createObjectStoreQueries(store);
  });

  return null;
};

const authUseValue = AuthStore.storeUIHooks.useValue;

export function useIsUserStoreLoading(): boolean {
  const user_id = authUseValue('user_id', AuthStore.store_id);
  const store = UserUiHooks.useStore(userStoreName(user_id!));
  return store === undefined;
}
export function useUserStoreId(): string {
  const user_id = authUseValue('user_id', AuthStore.store_id);
  return userStoreName(user_id!);
}
export function useUserStore(): UserStoreType {
  const store = UserUiHooks.useStore(useUserStoreId());
  return store as UserStoreType;
}
export function UserStoreQueries(): UserQueriesType {
  const store = useUserStore();
  return createQueries(store!);
}
export function UserStoreIndexes(): UserIndexesType {
  const store = useUserStore();
  return createIndexes(store!);
}
export function UserStoreRelationships(): UserRelationshipsType {
  const store = useUserStore();
  return createRelationships(store!);
}
