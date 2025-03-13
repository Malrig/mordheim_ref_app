import { Text, View, FlatList, Pressable } from "react-native";
import { Link } from 'expo-router';
import * as React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { Divider, List } from "react-native-paper";

type Props = {
  before: string,
  after: string,
}

export default function ColonText({ before, after }: Props) {
  return (
    <Text style={{ flexDirection: 'row', }}>
      <Text style={{ fontWeight: "bold" }}>{before}: </Text>
      {after}
    </Text>
  );
}

