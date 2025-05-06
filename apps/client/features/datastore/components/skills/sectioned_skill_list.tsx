import React from 'react';
import { SectionedList } from '@/shared/components/sectioned_list';
import { ThemedView } from '@/shared/components/themed_components';
import { DataStore } from '@/shared/stores/stores';
import { SkillGroup } from '@/features/datastore/objects/skill_group';
import SkillListItem from './list_item';

interface SkillSection {
  title: string;
  data: SkillObject[];
  sectionKey: string;
}

interface SkillObject {
  id: string;
  group_id: string;
}

type Props = {
  skills: SkillObject[];
};

export default function SectionedSkillList({ skills }: Props) {
  const skill_groups = Object.values(
    DataStore.storeUIHooks.useTable(SkillGroup.TABLE_NAME, DataStore.store_id)
  ).map((row) => SkillGroup.fromRow(row));

  const sections: SkillSection[] = skill_groups.map((group) => {
    return {
      title: group.name,
      data: skills.filter((item) => item.group_id === group.id),
      sectionKey: group.name,
    };
  });

  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      <SectionedList<SkillObject>
        sections={sections}
        renderItem={({ item }) => <SkillListItem skill={item.id} />}
      />
    </ThemedView>
  );
}
