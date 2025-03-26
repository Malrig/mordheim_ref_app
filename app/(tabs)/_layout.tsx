import { Text, View, Pressable, TextInput, Image } from "react-native";
import { Stack, Tabs } from "expo-router";
import { PaperProvider } from 'react-native-paper';
import { Button } from "react-native-paper";
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "@/library/store/store"
import React from "react";

const icons_path = "@/assets/images/icons/";

const icons = {
  home_selected: require(icons_path + 'home_selected.png'),
  home_default: require(icons_path + 'home_default.png'),
  skills_selected: require(icons_path + 'skills_selected.png'),
  skills_default: require(icons_path + 'skills_default.png'),
  items_selected: require(icons_path + 'items_selected.png'),
  items_default: require(icons_path + 'items_default.png'),
  favourites_selected: require(icons_path + 'favourites_selected.png'),
  favourites_default: require(icons_path + 'favourites_default.png'),
}

export default function RootLayout() {
  return <>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
        headerStyle: {
          backgroundColor: '#25292e',
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#25292e',
        },
      }}
    >
      <Tabs.Screen name="index" options={{
        title: "Home", tabBarIcon: ({ color, focused }) => (
          <Image
            source={focused ? icons["home_selected"] : icons["home_default"]}
            style={{ tintColor: color, width: 24, height: 24 }}
          />
        )
      }} />
      <Tabs.Screen name="skills" options={{
        title: "Skills", tabBarIcon: ({ color, focused }) => (
          <Image
            source={focused ? icons["skills_selected"] : icons["skills_default"]}
            style={{ tintColor: color, width: 24, height: 24 }}
          />
        )
      }} />
      <Tabs.Screen name="items" options={{
        title: "Items", tabBarIcon: ({ color, focused }) => (
          <Image
            source={focused ? icons["items_selected"] : icons["items_default"]}
            style={{ tintColor: color, width: 24, height: 24 }}
          />
        )
      }} />
      <Tabs.Screen name="favourites" options={{
        title: "Favourites", tabBarIcon: ({ color, focused }) => (
          <Image
            source={focused ? icons["favourites_selected"] : icons["favourites_default"]}
            style={{ tintColor: color, width: 24, height: 24 }}
          />
        )
      }} />
      <Tabs.Screen name="newitems" options={{
        title: "New Item Page", tabBarIcon: ({ color, focused }) => (
          <Image
            source={focused ? icons["items_selected"] : icons["items_default"]}
            style={{ tintColor: color, width: 24, height: 24 }}
          />
        )
      }} />

    </Tabs>
  </>;
}
