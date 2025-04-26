import { Store } from "tinybase/store/with-schemas";
import { createIndexes, createQueries, createRelationships, Indexes, Queries, Relationships } from "tinybase/with-schemas";

const permissions_schema = {
  permissions: {
    permission_name: { type: 'string' },
  }
} as const;

const user_specific_stores_schema = {
  user_specific_stores: {
    store_name: {type: 'string'}
  }
} as const;

export const TablesSchema = { ...permissions_schema, ...user_specific_stores_schema } as const;
export const ValuesSchema = {
  email: {type: "string", default: ""},
  access_token: {type: "string", default: ""},
  user_role: {type: "string", default: ""},
  user_id: {type: "string", default: ""},
} as const;

export type AuthStoreType = Store<[typeof TablesSchema, typeof ValuesSchema]>;
export type AuthRelationshipsType = Relationships<  [typeof TablesSchema, typeof ValuesSchema]>;
export type AuthIndexesType = Indexes<  [typeof TablesSchema, typeof ValuesSchema]>;
export type AuthQueriesType = Queries<  [typeof TablesSchema, typeof ValuesSchema]>;

export function createObjectStoreRelationships(store: Store<
  [typeof TablesSchema, typeof ValuesSchema]
>): AuthRelationshipsType {
  const store_relations = createRelationships(store);

  return store_relations;
}

export function createObjectStoreIndexes(store: Store<
  [typeof TablesSchema, typeof ValuesSchema]
>): AuthIndexesType {
  const store_indexes = createIndexes(store);

  return store_indexes;
}

export function createObjectStoreQueries(store: Store<
  [typeof TablesSchema, typeof ValuesSchema]
>): AuthQueriesType {
  const store_queries = createQueries(store);

  return store_queries;
}
