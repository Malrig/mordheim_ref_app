import { Content } from "tinybase/store/with-schemas";
import { ItemType, WeaponType } from "../../types/items";
import { TablesSchema, ValuesSchema } from "./schema";
import { Metadata, SourceStatus } from "../../types/metadata";
import { initialArmourState, initialMiscItemState } from "../../data/items";
import { initialWeaponState, initialSpecialRuleState } from "../../data/weapons";
import { initialSkillState } from "../../data/skills";

const initialItems = [...initialArmourState, ...initialMiscItemState, ...initialWeaponState];

const initialItemEntries = initialItems.map((item) => {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    availability: JSON.stringify(item.availability || []),
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
    favourite: item.favourite || false,
    source: item.source || '',
    source_type: (item.source_type || SourceStatus.Unknown).toString(),
  };
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
    group: skill.group
  };
});
const skillMetadataEntries = initialSkillState.map((skill: Metadata) => {
  return {
    table_name_id: `skills_${skill.id}`,
    favourite: skill.favourite || false,
    source: skill.source || '',
    source_type: (skill.source_type || SourceStatus.Unknown).toString(),
  };
});

const allMetadataEntries = [...itemMetadataEntries, ...skillMetadataEntries];

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
  )
} as const;

const InitialValueData = {
  // isThemeDark: localStorage.getItem("theme") === "dark",
};

export const InitialData: Content<[typeof TablesSchema, typeof ValuesSchema]> = [
  InitialTableData,
  InitialValueData
];

export { InitialTableData };
