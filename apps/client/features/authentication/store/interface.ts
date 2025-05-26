import { StoreInterface } from '../../../shared/stores/store_interface';
import { TablesSchema, ValuesSchema } from './schema';
import {
  STORE_NAME,
  AuthUiHooks,
  useAuthStore,
  AuthStoreQueries,
  AuthStoreIndexes,
  AuthStoreRelationships,
  useIsAuthStoreLoading,
} from './store';

export const AuthStore: StoreInterface<
  [typeof TablesSchema, typeof ValuesSchema]
> = {
  store_id: STORE_NAME,
  useStoreId: undefined,
  isLoading: useIsAuthStoreLoading,
  useStore: useAuthStore,
  useQueries: AuthStoreQueries,
  useIndexes: AuthStoreIndexes,
  useRelationships: AuthStoreRelationships,
  storeUIHooks: AuthUiHooks,
};
