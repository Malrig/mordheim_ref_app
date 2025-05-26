import * as React from 'react';
import { ItemType } from '../../enums';
import { Item } from '../../objects/item';
import { useToggleFavouriteCallback } from '@/features/userstore/hooks/favourites';
import { SpecialRules } from '@/features/datastore/components/special_rules';
import ColonText from '@/shared/components/colon_text';
import { Expandable } from '@/shared/components/expandable';
import { ThemedText, ThemedView } from '@/shared/components/themed_components';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View, Pressable, StyleSheet } from 'react-native';
import { Divider } from 'react-native-paper';
import RichText from '@/shared/components/markdown_text';

type Props = {
  item: {
    id: string;
  };
};

export default function ItemListItem({ item }: Props) {
  const item_object = Item.useInstance(item.id);
  const isFavourite = item_object.useFavourite();

  const setFavouriteCb = useToggleFavouriteCallback(
    Item.TABLE_NAME,
    item_object.id
  );

  const header = (
    <View style={styles.header}>
      <Pressable
        onPress={() => {
          console.log('Pressed');
          setFavouriteCb();
        }}
        style={{ padding: 3 }}
      >
        <FontAwesome name={isFavourite ? 'heart' : 'heart-o'} />
      </Pressable>
      <ThemedText>{item_object.name}</ThemedText>
      <Pressable
        onPress={() => router.push(`/items/${item.id}`)}
        style={styles.detailsButton}
      >
        <FontAwesome name="info-circle" />
      </Pressable>
    </View>
  );

  return (
    <Expandable
      title={header}
      containerStyle={styles.item}
      contentStyle={styles.content}
    >
      {item_object.item_type === ItemType.Weapon && (
        <ThemedView>
          <ColonText
            before="Range"
            after={item_object.range?.toString() || ''}
          />
          <ColonText
            before="Strength"
            after={item_object.strength?.toString() || ''}
          />
          <Divider />
          <SpecialRules specialRules={item_object.getSpecialRuleIds()} />
        </ThemedView>
      )}
      {item_object.item_type != ItemType.Weapon && (
        <RichText text={item_object.description} />
      )}
    </Expandable>
  );
}

const styles = StyleSheet.create({
  item: {
    borderRadius: 10,
    borderColor: '#000000',
    borderWidth: 1,
    margin: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    padding: 5,
  },
  colonText: {
    margin: 3,
  },
  detailsButton: {
    marginLeft: 'auto',
    padding: 8,
  },
});
