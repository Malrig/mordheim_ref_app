import { Image } from "react-native";
import { Tabs } from "expo-router";
import React from "react";
import { useIsLoggedIn } from "@/library/stores/auth/utils/login";
import { useThemeColour } from "@/library/stores/user/utils/theme";

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
  const backgroundColor = useThemeColour('primary');
  const textColor = useThemeColour('text');
  const tabBarBackgroundColor = useThemeColour('tabBarBackground');
  const tabIconSelected = useThemeColour('tabIconSelected');
  const tabIconDefault = useThemeColour('tabIconDefault');

  return <Tabs
    screenOptions={{
      tabBarActiveTintColor: tabIconSelected,
      tabBarInactiveTintColor: tabIconDefault,
      headerStyle: {
        backgroundColor: tabBarBackgroundColor,
      },
      // headerShadowVisible: false,
      headerTintColor: textColor,
      tabBarStyle: {
        backgroundColor: tabBarBackgroundColor,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '500',
      },
    }}
  >
    <Tabs.Screen name="index" options={{
      sceneStyle: {
        backgroundColor: backgroundColor, // This what you want
      },
      title: "Home", tabBarIcon: ({ color, focused }: { color: string, focused: boolean }) => (
        <Image
          source={focused ? icons["home_selected"] : icons["home_default"]}
          style={{ tintColor: color, width: 24, height: 24 }}
        />
      )
    }} />
    <Tabs.Screen name="skills" options={{
      sceneStyle: {
        backgroundColor: backgroundColor, // This what you want
      },
      title: "Skills", tabBarIcon: ({ color, focused }: { color: string, focused: boolean }) => (
        <Image
          source={focused ? icons["skills_selected"] : icons["skills_default"]}
          style={{ tintColor: color, width: 24, height: 24 }}
        />
      )
    }} />
    <Tabs.Screen name="items" options={{
      sceneStyle: {
        backgroundColor: backgroundColor, // This what you want
      },
      title: "Items", tabBarIcon: ({ color, focused }: { color: string, focused: boolean }) => (
        <Image
          source={focused ? icons["items_selected"] : icons["items_default"]}
          style={{ tintColor: color, width: 24, height: 24 }}
        />
      )
    }} />
    <Tabs.Screen name="favourites" options={{
      sceneStyle: {
        backgroundColor: backgroundColor, // This what you want
      },
      title: "Favourites", tabBarIcon: ({ color, focused }: { color: string, focused: boolean }) => (
        <Image
          source={focused ? icons["favourites_selected"] : icons["favourites_default"]}
          style={{ tintColor: color, width: 24, height: 24 }}
        />
      )
    }} />
  </Tabs>;
}
