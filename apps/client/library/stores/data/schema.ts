import { SourceStatus } from '../../data/data_interfaces/metadata';
import { Store } from "tinybase/store/with-schemas";
import { createIndexes, createQueries, createRelationships, Indexes, MergeableStore, Queries, Relationships } from "tinybase/with-schemas";

const metadata_schema = {
  metadata: {
    // Metadata belongs to any object on any table, so ID needs to contain both the table
    // name and the object ID. Should be {table_name}_{object_id}.
    table_name_id: { type: 'string' },
    source: { type: 'string', default: "" },
    source_type: { type: 'string', default: SourceStatus.Unknown.toString() }
  }

} as const;

const restriction_schema = {
  restrictions: {
    id: { type: 'string' },
    type: { type: 'string' },
    restriction: { type: 'string' },
    restriction_type: { type: 'string' },
    availability_id: { type: 'string' },
  }
} as const;

const availability_schema = {
  availabilities: {
    id: { type: 'string' }, // This is referenced by the restrictions table.
    rarity: { type: 'number' },
    // Availability can be on skills or items, so we need to know what type of object it is.
    related_object_type: { type: 'string' },
    object_id: { type: 'string' },
  }
} as const;

const item_schema = {
  items: {
    id: { type: 'string' }, // This is referenced by the availability table and the metadata table.
    // General fields
    name: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'string' },
    item_type: {
      type: 'string',
      default: ""
    },

    // Weapon-specific fields
    range: { type: 'string', default: '' },
    strength: { type: 'string', default: '' },
    special_rules: { type: 'string', default: '' }, // JSON string of string[]
    weapon_type: {
      type: 'string',
      default: ''
    }
  }
} as const;

const special_rule_schema = {
  special_rules: {
    id: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' }
  }
} as const;

const skill_schema = {
  skills: {
    id: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    group_id: { type: 'string' }
  }
} as const;

const skill_group_schema = {
  skill_groups: {
    id: { type: 'string' },
    name: { type: 'string' },
  }
} as const;

// Should add some listeners to ensure that the data is always valid. This can include:
// - Checking that the availability is a valid array
// - Checking that the special_rules is a valid array
// - Checking that the weapon_type is a valid WeaponType
// - Checking that the item_type is a valid ItemType

export const TablesSchema = {
  ...metadata_schema,
  ...restriction_schema,
  ...availability_schema,
  ...item_schema,
  ...special_rule_schema,
  ...skill_schema,
  ...skill_group_schema,
} as const;
export const ValuesSchema = {} as const;

export type DataStoreType = MergeableStore<[typeof TablesSchema, typeof ValuesSchema]>;
export type DataRelationshipsType = Relationships<[typeof TablesSchema, typeof ValuesSchema]>;
export type DataIndexesType = Indexes<[typeof TablesSchema, typeof ValuesSchema]>;
export type DataQueriesType = Queries<[typeof TablesSchema, typeof ValuesSchema]>;

export function createObjectStoreRelationships(store: Store<
  [typeof TablesSchema, typeof ValuesSchema]
>): DataRelationshipsType {
  const store_relations = createRelationships(store);

  // Create relationships for the metadata table
  store_relations.setRelationshipDefinition(
    "itemsMetadata",
    "items",
    "metadata",
    (getCell) => `items_${getCell('id')}`,
  );
  store_relations.setRelationshipDefinition(
    "skillsMetadata",
    "skills",
    "metadata",
    (getCell) => `skills_${getCell('id')}`,
  );

  // Allows easily finding the restrictions for an availability
  store_relations.setRelationshipDefinition(
    "restrictionsAvailability",
    "restrictions",
    "availabilities",
    "availability_id",
  );

  // Allows easily finding the skill group for a skill
  store_relations.setRelationshipDefinition(
    "skillsSkillGroup",
    "skills",
    "skill_groups",
    "group_id",
  );

  return store_relations;
}

export function createObjectStoreIndexes(store: Store<
  [typeof TablesSchema, typeof ValuesSchema]
>): DataIndexesType {
  const store_indexes = createIndexes(store);

  // Want to index items by item_type and weapon_type
  store_indexes.setIndexDefinition(
    "by_item_type",
    "items",
    (getCell) => `${getCell('item_type')}_${getCell('weapon_type')}`,
  );

  // store_indexes.setIndexDefinition(
  //   "by_skill_group",
  //   "skills",
  //   "group",
  // );

  // Allows easily finding the availability for a particular object
  store_indexes.setIndexDefinition(
    "availabilityByObjectTypeAndId",
    "availabilities",
    (getCell) => `${getCell('related_object_type')}_${getCell('object_id')}`,
  );

  return store_indexes;
}

export function createObjectStoreQueries(store: Store<
  [typeof TablesSchema, typeof ValuesSchema]
>): DataQueriesType {
  const store_queries = createQueries(store);

  // This query is used to get all the items in a format that allows filtering. It also
  // includes all the information required by the SectionedItemList component.
  store_queries.setQueryDefinition(
    "filterable_items",
    "items",
    ({ select }) => {
      select("id");
      select("name");
      select("description");
      select("item_type");
      select("weapon_type");
    }
  );

  return store_queries;
}
