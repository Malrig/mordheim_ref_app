import { createIndexes, createQueries, createRelationships, Indexes, MergeableStore, Queries, Relationships, Store } from "tinybase/with-schemas";

const favourites = {
  favourites: {
    id: { type: 'string' },
    object_table: { type: 'string' },
    object_id: { type: 'string' },
  }

} as const;

export const TablesSchema = { ...favourites } as const;
export const ValuesSchema = {} as const;

export type UserStoreType = MergeableStore<[typeof TablesSchema, typeof ValuesSchema]>;
export type UserRelationshipsType = Relationships<  [typeof TablesSchema, typeof ValuesSchema]>;
export type UserIndexesType = Indexes<  [typeof TablesSchema, typeof ValuesSchema]>;
export type UserQueriesType = Queries<  [typeof TablesSchema, typeof ValuesSchema]>;

export function createObjectStoreRelationships(store: Store<
  [typeof TablesSchema, typeof ValuesSchema]
>): Relationships<  [typeof TablesSchema, typeof ValuesSchema]> {
  const store_relations = createRelationships(store);

  return store_relations;
}

export function createObjectStoreIndexes(store: Store<
  [typeof TablesSchema, typeof ValuesSchema]
>): Indexes<  [typeof TablesSchema, typeof ValuesSchema]>{
  const store_indexes = createIndexes(store);

  // Want to index favourites by object table
  store_indexes.setIndexDefinition(
    "by_object_table",
    "favourites",
    "object_table",
  );

  return store_indexes;
}

export function createObjectStoreQueries(store: Store<
  [typeof TablesSchema, typeof ValuesSchema]
>): Queries<  [typeof TablesSchema, typeof ValuesSchema]> {
  const store_queries = createQueries(store);

  return store_queries;
}
