import { Store } from "tinybase/store/with-schemas";
import { createIndexes, createQueries, createRelationships, Indexes, Queries, Relationships } from "tinybase/with-schemas";


export const TablesSchema = {} as const;
export const ValuesSchema = {
  username: {type: "string", default: ""},
  access_token: {type: "string", default: ""},
} as const;

export function createObjectStoreRelationships(store: Store<
  [typeof TablesSchema, typeof ValuesSchema]
>): Relationships<
  [typeof TablesSchema, typeof ValuesSchema]
> {
  const store_relations = createRelationships(store);

  return store_relations;
}

export function createObjectStoreIndexes(store: Store<
  [typeof TablesSchema, typeof ValuesSchema]
>): Indexes<
  [typeof TablesSchema, typeof ValuesSchema]
> {
  const store_indexes = createIndexes(store);

  return store_indexes;
}

export function createObjectStoreQueries(store: Store<
  [typeof TablesSchema, typeof ValuesSchema]
>): Queries<
  [typeof TablesSchema, typeof ValuesSchema]
> {
  const store_queries = createQueries(store);
  
  return store_queries;
}
