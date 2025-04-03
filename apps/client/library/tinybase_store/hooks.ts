import { useResultTable } from './ui';
import { Item } from './objects/item';
import { SpecialRule } from './objects/special_rule';
import { Skill } from './objects/skill';

/**
 * Hook to retrieve special rules for an item
 * @param item The item to get special rules for
 * @returns An array of special rule objects with id, name, and description
 */
export function useSpecialRules(item: Item): Array<{ id: string; name: string; description: string }> {
  // Get the special rules as an array of IDs
  const specialRuleIds = item.getSpecialRules();

  // Get the special rules table from TinyBase
  const specialRulesTable = useResultTable('special_rules');

  // Map the IDs to their corresponding special rule objects
  return specialRuleIds
    .map(id => {
      const rule = specialRulesTable[id];
      if (!rule) return null;

      return {
        id: rule.id as string,
        name: rule.name as string,
        description: rule.description as string
      };
    })
    .filter((rule): rule is { id: string; name: string; description: string } => rule !== null);
}

/**
 * Hook to retrieve skills grouped by their category
 * @returns An object with skill groups as keys and arrays of skill objects as values
 */
export function useSkillsByGroup(): Record<string, Array<{ id: string; name: string; description: string }>> {
  // Get the skills table from TinyBase
  const skillsTable = useResultTable('skills');

  // Group skills by their group
  const skillsByGroup: Record<string, Array<{ id: string; name: string; description: string }>> = {};

  // Iterate through all skills and group them
  Object.values(skillsTable).forEach(skill => {
    const group = skill.group as string || 'Uncategorized';
    const skillObj = {
      id: skill.id as string,
      name: skill.name as string,
      description: skill.description as string
    };

    if (!skillsByGroup[group]) {
      skillsByGroup[group] = [];
    }

    skillsByGroup[group].push(skillObj);
  });

  return skillsByGroup;
} 