import { View, FlatList } from "react-native";
import * as React from 'react';
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

