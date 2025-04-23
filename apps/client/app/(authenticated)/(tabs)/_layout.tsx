import { Text, View, Pressable, TextInput, Image } from "react-native";
import { Stack, Tabs } from "expo-router";
import { PaperProvider } from 'react-native-paper';
import { Button } from "react-native-paper";
import { jwtDecode } from 'jwt-decode'
import React from "react";
import { supabase } from '@/library/supabase';
import { Session } from '@supabase/supabase-js'
import { useEffect, useState } from 'react';
import { DataStore } from "@/library/stores/data/store";
import { UserStore } from "@/library/stores/user/store";
import { useIsLoggedIn } from "@/library/stores/auth/utils/login";

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
  const isLoggedIn = useIsLoggedIn();

  return <>
    {isLoggedIn  &&
    <>
      <DataStore />
      <UserStore />
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
          title: "Home", tabBarIcon: ({ color, focused }: { color: string, focused: boolean }) => (
            <Image
              source={focused ? icons["home_selected"] : icons["home_default"]}
              style={{ tintColor: color, width: 24, height: 24 }}
            />
          )
        }} />
        <Tabs.Screen name="skills" options={{
          title: "Skills", tabBarIcon: ({ color, focused }: { color: string, focused: boolean }) => (
            <Image
              source={focused ? icons["skills_selected"] : icons["skills_default"]}
              style={{ tintColor: color, width: 24, height: 24 }}
            />
          )
        }} />
        <Tabs.Screen name="items" options={{
          title: "Items", tabBarIcon: ({ color, focused }: { color: string, focused: boolean }) => (
            <Image
              source={focused ? icons["items_selected"] : icons["items_default"]}
              style={{ tintColor: color, width: 24, height: 24 }}
            />
          )
        }} />
        <Tabs.Screen name="favourites" options={{
          title: "Favourites", tabBarIcon: ({ color, focused }: { color: string, focused: boolean }) => (
            <Image
              source={focused ? icons["favourites_selected"] : icons["favourites_default"]}
              style={{ tintColor: color, width: 24, height: 24 }}
            />
          )
        }} />
      </Tabs>
      </>
    }
  </>;
}
