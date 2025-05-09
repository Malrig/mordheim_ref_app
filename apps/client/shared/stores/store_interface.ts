import {
  TablesSchema as tbTablesSchema,
  ValuesSchema as tbValuesSchema,
  MergeableStore,
  Indexes,
  Queries,
  Relationships,
  Store,
} from 'tinybase/with-schemas';
import * as UiReact from 'tinybase/ui-react/with-schemas';

export interface StoreInterface<
  StoreSchema extends [tbTablesSchema, tbValuesSchema],
> {
  // For most stores the ID is fixed and so can be stored in a constant. But some
  // stores IDs are dynamic and so need to be generated at runtime using useStoreId.
  store_id: string | undefined;
  useStoreId: undefined | (() => string);
  // The isLoading hook can be used to determine whether a store is ready and available.
  // If loading then it's not ready yet and no other functions in this interface should
  // be used.
  isLoading: () => boolean;
  useStore: () => MergeableStore<StoreSchema> | Store<StoreSchema>;
  useQueries: () => Queries<StoreSchema>;
  useIndexes: () => Indexes<StoreSchema>;
  useRelationships: () => Relationships<StoreSchema>;
  storeUIHooks: UiReact.WithSchemas<StoreSchema>;
}

export function isLoading(): boolean {
  return false;
}
