import { Image } from "react-native";
import { Tabs } from "expo-router";
import React from "react";
import { useIsLoggedIn } from "@/library/stores/auth/utils/login";
import { useThemeColour } from "@/library/stores/user/utils/theme";
import { ThemedText } from "@/components/general/themed_components";
import { Header } from "@/components/general/header";
const icons_path = "@/assets/images/icons/";

const icons = {
  index_selected: require(icons_path + 'home_selected.png'),
  index_default: require(icons_path + 'home_default.png'),
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
    screenOptions={({ route, navigation }) => ({
      tabBarActiveTintColor: tabIconSelected,
      tabBarInactiveTintColor: tabIconDefault,
      headerStyle: {
        backgroundColor: tabBarBackgroundColor,
      },
      headerTintColor: textColor,
      tabBarStyle: {
        backgroundColor: tabBarBackgroundColor,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '500',
      },
      sceneStyle: {
        backgroundColor: backgroundColor
      },
      header: ({ route, options }) => <Header title={options.title || route.name} />,
      tabBarIcon: ({ color, focused }: { color: string, focused: boolean }) => (
        <Image
          source={focused ? icons[`${route.name}_selected` as keyof typeof icons] : icons[`${route.name}_default` as keyof typeof icons]}
          style={{ tintColor: color, width: 24, height: 24 }}
        />
      )
    })}
  >
    <Tabs.Screen name="index" options={{ title: "Home" }} />
    <Tabs.Screen name="skills" options={{ title: "Skills" }} />
    <Tabs.Screen name="items" options={{ title: "Items" }} />
    <Tabs.Screen name="favourites" options={{ title: "Favourites" }} />
  </Tabs>;
}
