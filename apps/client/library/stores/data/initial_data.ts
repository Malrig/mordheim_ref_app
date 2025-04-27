import { Content } from "tinybase/store/with-schemas";
import { TablesSchema, ValuesSchema } from "./schema";
import { Metadata, SourceStatus } from "../../data/data_interfaces/metadata";
import { initialArmourState, initialMiscItemState } from "../../data/items";
import { initialWeaponState, initialSpecialRuleState } from "../../data/weapons";
import { initialSkillGroups, initialSkillState } from "../../data/skills";
import { nanoid } from "nanoid";

const initialItems = [...initialArmourState, ...initialMiscItemState, ...initialWeaponState];

const initialItemEntries = initialItems.map((item) => {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price || '',
    item_type: item.item_type || '',
    range: item.range || '',
    strength: item.strength || '',
    special_rules: JSON.stringify(item.special_rules || []),
    weapon_type: item.weapon_type || ''
  };
});
const itemMetadataEntries = initialItems.map((item: Metadata) => {
  return {
    table_name_id: `items_${item.id}`,
    source: item.source || '',
    source_type: (item.source_type || SourceStatus.Unknown).toString(),
  };
});
const itemAvailabilityEntries = initialItems.flatMap((item) => {
  const availability = item.availability || [];
  return availability.map((availability) => {
    return {
      id: availability.id,
      rarity: availability.rarity,
      related_object_type: "items",
      object_id: item.id,
    };
  });
});
const itemRestrictionEntries = initialItems.flatMap((item) => {
  const availability = item.availability || [];
  return availability.flatMap((availability) => {
    const restrictions = availability.restrictions || [];
    return restrictions.map((restriction) => {
      return {
        id: nanoid(),
        restriction_type: String(restriction.restriction_type),
        restriction: String(restriction.restriction),
        availability_id: availability.id,
      };
    });
  });
});

const initialSpecialRuleEntries = initialSpecialRuleState.map((rule) => {
  return {
    id: rule.id,
    name: rule.name,
    description: rule.description,
  };
});

const initialSkillEntries = initialSkillState.map((skill) => {
  return {
    id: skill.id,
    name: skill.name,
    description: skill.description,
    group_id: skill.group_id
  };
});
const skillMetadataEntries = initialSkillState.map((skill: Metadata) => {
  return {
    table_name_id: `skills_${skill.id}`,
    source: skill.source || '',
    source_type: (skill.source_type || SourceStatus.Unknown).toString(),
  };
});
const skillGroupEntries = Object.values(initialSkillGroups).map((group) => {
  return {
    id: group.id,
    name: group.name,
  };
});
const skillGroupAvailabilityEntries = Object.values(initialSkillGroups).flatMap((group) => {
  const availability = group.availability || [];
  return availability.map((availability) => {
    return {
      id: availability.id,
      rarity: availability.rarity,
      related_object_type: "skill_groups",
      object_id: group.id,
    };
  });
});
const skillGroupRestrictionEntries = Object.values(initialSkillGroups).flatMap((group) => {
  const availability = group.availability || [];
  return availability.flatMap((availability) => {
    const restrictions = availability.restrictions || [];
    return restrictions.map((restriction) => {
      return {
        id: nanoid(),
        restriction_type: String(restriction.restriction_type),
        restriction: String(restriction.restriction),
        availability_id: availability.id,
      };
    });
  });
});

const allMetadataEntries = [...itemMetadataEntries, ...skillMetadataEntries];
const allAvailabilityEntries = [...itemAvailabilityEntries, ...skillGroupAvailabilityEntries];
const allRestrictionEntries = [...itemRestrictionEntries, ...skillGroupRestrictionEntries];

// Validate all IDs are set
const validateIds = (entries: any[], type: string) => {
  entries.forEach(entry => {
    if (!entry.id) {
      throw new Error(`Missing ID in ${type} entry: ${JSON.stringify(entry)}`);
    }
  });
};

// validateIds(allMetadataEntries, 'metadata');
validateIds(allAvailabilityEntries, 'availability');
validateIds(allRestrictionEntries, 'restriction');
validateIds(initialItemEntries, 'item');
validateIds(initialSkillEntries, 'skill');
validateIds(initialSpecialRuleEntries, 'special rule');
validateIds(skillGroupEntries, 'skill group');

console.log(`Loaded ${allMetadataEntries.length} metadata entries`);
console.log(`Loaded ${allAvailabilityEntries.length} availability entries`);
console.log(`Loaded ${allRestrictionEntries.length} restriction entries`);
console.log(`Loaded ${initialItemEntries.length} item entries`);
console.log(`Loaded ${initialSkillEntries.length} skill entries`);
console.log(`Loaded ${initialSpecialRuleEntries.length} special rule entries`);

const InitialTableData = {
  metadata: Object.fromEntries(
    allMetadataEntries.map(entry => [entry.table_name_id, entry])
  ),
  items: Object.fromEntries(
    initialItemEntries.map(item => [item.id, item])
  ),
  special_rules: Object.fromEntries(
    initialSpecialRuleEntries.map(rule => [rule.id, rule])
  ),
  skills: Object.fromEntries(
    initialSkillEntries.map(skill => [skill.id, skill])
  ),
  skill_groups: Object.fromEntries(
    skillGroupEntries.map(group => [group.id, group])
  ),
  availabilities: Object.fromEntries(
    allAvailabilityEntries.map(availability => [availability.id, availability])
  ),
  restrictions: Object.fromEntries(
    allRestrictionEntries.map(restriction => [restriction.id, restriction])
  ),
} as const;

const InitialValueData = {
  // isThemeDark: localStorage.getItem("theme") === "dark",
};

export const InitialData: Content<[typeof TablesSchema, typeof ValuesSchema]> = [
  InitialTableData,
  InitialValueData
];
