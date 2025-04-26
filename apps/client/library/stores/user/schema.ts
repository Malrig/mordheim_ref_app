import { createIndexes, createQueries, createRelationships, Indexes, MergeableStore, Queries, Relationships, Store } from "tinybase/with-schemas";

const favourites = {
  favourites: {
    id: { type: 'string' },
    object_table: { type: 'string' },
    object_id: { type: 'string' },
  }
} as const;

export const TablesSchema = { ...favourites } as const;
export const ValuesSchema = {
  theme: {type: "string", default: "dark"},
} as const;

export type UserStoreType = MergeableStore<[typeof TablesSchema, typeof ValuesSchema]>;
export type UserRelationshipsType = Relationships<  [typeof TablesSchema, typeof ValuesSchema]>;
export type UserIndexesType = Indexes<  [typeof TablesSchema, typeof ValuesSchema]>;
export type UserQueriesType = Queries<  [typeof TablesSchema, typeof ValuesSchema]>;

export function createObjectStoreRelationships(store: Store<
  [typeof TablesSchema, typeof ValuesSchema]
>): UserRelationshipsType {
  const store_relations = createRelationships(store);

  return store_relations;
}

export function createObjectStoreIndexes(store: Store<
  [typeof TablesSchema, typeof ValuesSchema]
>): UserIndexesType {
  const store_indexes = createIndexes(store);

  // Want to index favourites by object table
  store_indexes.setIndexDefinition(
    "by_object_table",
    "favourites",
    "object_table",
  );
  // Objects need to be able to search for their entry easily.
  store_indexes.setIndexDefinition(
    "by_object_table_and_id",
    "favourites",
    (getCell) => `${getCell("object_table")}_${getCell('object_id')}`,
  );

  return store_indexes;
}

export function createObjectStoreQueries(store: Store<
  [typeof TablesSchema, typeof ValuesSchema]
>): UserQueriesType {
  const store_queries = createQueries(store);

  return store_queries;
}
