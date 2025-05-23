import { StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ItemType } from '@/features/datastore/enums';
import { Item } from '@/features/datastore/objects/item';
import React from 'react';
import { ThemedText, ThemedView } from '@/shared/components/themed_components';
import ColonText from '@/shared/components/colon_text';
import MarkdownText from '@/shared/components/markdown_text';
import { Availability } from '@/features/datastore/objects/availability';
import { Expandable } from '@/shared/components/expandable';
import { SpecialRules } from '@/features/datastore/components/special_rules';
import AvailabilityDetails from '@/features/datastore/components/availability_details';
import { Dialog, Button, YStack, ScrollView, Unspaced } from 'tamagui';
import { ItemForm } from '@/features/datastore/components/items/item_form';

export function ItemDetail({ item: item_to_show }: { item: Item }) {
  const availabilities: Availability[] = item_to_show.useAvailabilities();
  const metadata = item_to_show.useMetadata();

  return (
    <ScrollView>
      <YStack gap="$3">
        <ThemedText variant="title">
          {item_to_show.name} -{' '}
          {item_to_show.item_type === ItemType.Weapon
            ? `${item_to_show.weapon_type} weapon`
            : item_to_show.item_type}
        </ThemedText>
        <MarkdownText text={item_to_show.description} />
        <Expandable title="Availability">
          <ColonText before="Price" after={item_to_show.price} />
          {availabilities.map((availability, index) => (
            <AvailabilityDetails key={index} availability={availability} />
          ))}
        </Expandable>
        {item_to_show.item_type === ItemType.Weapon && (
          <ThemedView style={styles.weapon_details_container}>
            <ColonText before="Range" after={item_to_show.range} />
            <ColonText before="Strength" after={item_to_show.strength} />
            <SpecialRules specialRules={item_to_show.getSpecialRuleIds()} />
          </ThemedView>
        )}

        <Dialog modal>
          <Dialog.Trigger asChild>
            <Button>Edit</Button>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay
              key="overlay"
              opacity={0.5}
              onPress={(e) => {
                e.preventDefault();
                (e.target as any)?.dispatchEvent?.(
                  new Event('dismiss', { bubbles: true })
                );
              }}
            />

            <Dialog.Content
              bordered
              key="content"
              gap="$4"
              elevate
              width={400}
              maxWidth="95%"
              maxHeight="95%"
            >
              <Dialog.Title>Edit Item</Dialog.Title>
              <ItemForm
                initialData={{
                  id: item_to_show.id,
                  name: item_to_show.name,
                  description: item_to_show.description,
                  price: item_to_show.price,
                  item_type: item_to_show.getItemType(),
                  range: item_to_show.range,
                  strength: item_to_show.strength,
                  special_rules: item_to_show.getSpecialRuleIds(),
                  weapon_type: item_to_show.getWeaponType(),
                  metadata: {
                    source: metadata?.source || '',
                    source_type: metadata?.source_type || '',
                  },
                }}
                isEditing={true}
              />
              <Unspaced>
                <Dialog.Close asChild>
                  <Button position="absolute" right="$3" size="$2" circular>
                    ✕
                  </Button>
                </Dialog.Close>
              </Unspaced>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>
      </YStack>
    </ScrollView>
  );
}

export default function CombinedItemsDetail() {
  const { id } = useLocalSearchParams();
  const item = Item.useInstance(id as string);

  return (
    <ThemedView style={styles.container} backgroundColor="primary">
      <ItemDetail item={item} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  weapon_details_container: {
    flex: 1,
  },
});
