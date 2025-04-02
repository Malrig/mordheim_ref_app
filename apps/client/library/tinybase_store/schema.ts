import { SourceStatus } from '../types/metadata';
import { Store } from "tinybase/store/with-schemas";
import { createIndexes, createRelationships, Indexes, Relationships } from "tinybase/with-schemas";

const metadata_schema = {
  metadata: {
    // Metadata belongs to any object on any table, so ID needs to contain both the table 
    // name and the object ID. Should be {table_name}_{object_id}.
    table_name_id: { type: 'string' },
    favourite: { type: 'boolean', default: false },
    source: { type: 'string', default: "" },
    source_type: { type: 'string', default: SourceStatus.Unknown.toString() }
  }

} as const;

const item_schema = {
  items: {
    id: { type: 'string' },
    // General fields
    name: { type: 'string' },
    description: { type: 'string' },
    availability: { type: 'string', default: '[]' }, // JSON string of Availability[]
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
    group: { type: 'string' }
  }
} as const;

export const TablesSchema = { ...metadata_schema, ...item_schema, ...special_rule_schema, ...skill_schema } as const;
export const ValuesSchema = {};

export function createObjectStoreRelationships(store: Store<
  [typeof TablesSchema, typeof ValuesSchema]
>): Relationships<
  [typeof TablesSchema, typeof ValuesSchema]
> {
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

  return store_relations;
}

export function createObjectStoreIndexes(store: Store<
  [typeof TablesSchema, typeof ValuesSchema]
>): Indexes<
  [typeof TablesSchema, typeof ValuesSchema]
> {
  const store_indexes = createIndexes(store);

  // Want to index items by item_type and weapon_type
  store_indexes.setIndexDefinition(
    "by_item_type",
    "items",
    (getCell) => `${getCell('item_type')}_${getCell('weapon_type')}`,
  );

  store_indexes.setIndexDefinition(
    "by_skill_group",
    "skills",
    "group",
  );

  return store_indexes;
}
