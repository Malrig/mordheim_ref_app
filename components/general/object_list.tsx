import { Text, View, FlatList, Pressable } from "react-native";
import { Link } from 'expo-router';
import * as React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { Divider, List } from "react-native-paper";

type Props<T> = {
  objects: T[],
  renderObject: (object: T) => React.ReactNode
}

export default function ObjectList<T>({ objects, renderObject }: Props<T>) {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
        }}
        data={objects} renderItem={
          ({ item: object }) =>
            <>
              {renderObject(object)}
            </>
        } />
    </View>
  );
}

