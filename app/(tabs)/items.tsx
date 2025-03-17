import { Text, View, FlatList, ScrollView, Dimensions, Animated, Image, StyleSheet, findNodeHandle, Pressable, TouchableOpacity } from "react-native";
import { Link } from 'expo-router';
import { useAppDispatch, useAppSelector } from "@/library/store/hooks";
import { fetchArmours, selectAllArmours, selectArmoursError, selectArmoursStatus } from "@/library/store/features/armoursSlice";
import React from "react";
import { selectAllMiscItems, selectMiscItemsStatus, selectMiscItemsError, fetchMiscItems } from "@/library/store/features/miscItemsSlice";
import { fetchWeapons, selectAllWeapons, selectWeaponsError, selectWeaponsStatus } from "@/library/store/features/weaponSlice";
import WeaponListItem from "@/components/weapons/list_item";
import { fetchSpecialRules, selectSpecialRulesStatus } from "@/library/store/features/specialRulesSlice";
import ObjectList from "@/components/general/object_list";
import { Armour, ItemType, MiscItem, Objects, Weapon } from "@/library/types/items";
import ItemListItem from "@/components/items/list_item";

// What does this page do?
// - Display all items available in the campaign.
//   - Split by type (e.g. melee weapon, ranged weapon, etc).
//   - Include special rules (special rules should be separate entities by reference).
// - People should be able to "favourite" items and they appear in the quick reference sheet.

interface TabData { key: string, title: string, content: React.ReactNode, ref: React.RefObject<View> }
const { width, height } = Dimensions.get('window');

const Tab = React.forwardRef(({ item, onItemPress }: { item: TabData, onItemPress: () => void }, ref: React.ForwardedRef<View>) => {
  return <View ref={ref}>
    <TouchableOpacity onPress={onItemPress}>
      <Text style={{ textTransform: "uppercase" }}>{item.title}</Text>
    </TouchableOpacity>
  </View>
});

type Measurement = { x: number, y: number, width: number, height: number }

const Indicator = ({ item_data, measures, scrollX }: { item_data: TabData[], measures: Measurement[], scrollX: Animated.Value }) => {
  const inputRange = item_data.map((_, i) => i * width);
  const indicatorWidth = scrollX.interpolate({
    inputRange, outputRange: measures.map((measure: Measurement) => measure.width)
  });
  const translateX = scrollX.interpolate({
    inputRange, outputRange: measures.map((measure: Measurement) => measure.x)
  });
  return <Animated.View style={{
    height: 4,
    width: indicatorWidth,
    backgroundColor: "black",
    transform: [{
      translateX
    }]
  }} />
};


const Tabs = ({ item_data, scrollX, onItemPress }: { item_data: TabData[], scrollX: Animated.Value, onItemPress: (index: number) => void }) => {
  const [measures, setMeasures] = React.useState<{ x: number; y: number; width: number; height: number; }[]>([]);
  const containerRef = React.useRef<View>(null);
  React.useEffect(() => {
    let m = [];
    item_data.forEach(item => {
      item.ref.current?.measureLayout(
        containerRef.current!,
        (x, y, width, height) => {
          m.push({
            x, y, width, height
          })

          if (m.length === item_data.length) {
            setMeasures(m);
          }
        }
      )
    })
  }, []);

  return <View style={{ width }}>
    <View
      ref={containerRef}
      style={{ justifyContent: "space-evenly", flexDirection: "row", flex: 1 }}>
      {item_data.map((item, index) => {
        return <Tab key={item.key} item={item} ref={item.ref} onItemPress={() => onItemPress(index)} />
      })}
    </View>
    {measures.length > 0 && <Indicator item_data={item_data} measures={measures} scrollX={scrollX} />}
  </View>
};

export default function Items() {
  const items = {
    armours: useAppSelector(selectAllArmours),
    misc_items: useAppSelector(selectAllMiscItems),
    weapons: useAppSelector(selectAllWeapons),
  }

  function object_content(item: "armours" | "weapons" | "misc_items") {
    switch (item) {
      case "armours":
        return <ObjectList<Armour> objects={items[item]} renderObject={(armour) => <ItemListItem item={armour} />} />
      case "misc_items":
        return <ObjectList<MiscItem> objects={items[item]} renderObject={(misc_item) => <ItemListItem item={misc_item} />} />
      case "weapons":
        return <ObjectList<Weapon> objects={items[item]} renderObject={(weapon) => <WeaponListItem weapon={weapon} />} />
      default:
        return <Text>Unknown item type</Text>
    }
  }

  const item_data = (Object.keys(items) as (keyof typeof items)[]).map((i) => ({
    key: i,
    title: i,
    content: object_content(i),
    ref: React.createRef<View>(),
  }));

  let content: React.ReactNode

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const tabFlatListRef = React.useRef<FlatList>(null);
  const onItemPress = React.useCallback((itemIndex: number) => {
    tabFlatListRef?.current?.scrollToOffset({
      offset: itemIndex * width,
    });
  }, [width]);

  content = <>
    <Tabs scrollX={scrollX} item_data={item_data} onItemPress={onItemPress} />
    <Animated.FlatList
      ref={tabFlatListRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={item_data}
      pagingEnabled
      keyExtractor={item => item.key}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
      )}
      renderItem={({ item }) => {
        return <View style={{ width, height }}>{item.content}</View>
      }}
    />
  </>

  return (
    <View style={{ flex: 1 }}>
      {content}
    </View>
  );
}
