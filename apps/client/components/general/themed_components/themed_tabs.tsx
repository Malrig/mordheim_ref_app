import React from 'react';
import { Tabs } from 'expo-router';
import { useThemeColour } from '@/library/stores/user/utils/theme';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { LoginStatus } from '../header';
import { ParamListBase } from '@react-navigation/routers';

interface ThemedTabsProps {
  children: React.ReactNode;
  screenOptions?: BottomTabNavigationOptions | ((props: {
          route: import("@react-navigation/native").RouteProp<ParamListBase, string>;
          navigation: import("@react-navigation/bottom-tabs").BottomTabNavigationProp<ParamListBase, string, undefined>;
          theme: ReactNavigation.Theme;
      }) => BottomTabNavigationOptions); // Options for all tabs in the navigator
}

export const ThemedTabs: React.FC<ThemedTabsProps> = ({
  children,
  screenOptions = () => ({}),
}) => {
  const backgroundColor = useThemeColour('primary');
  const textColor = useThemeColour('text');
  const tabBarBackgroundColor = useThemeColour('tabBarBackground');
  const tabIconSelected = useThemeColour('tabIconSelected');
  const tabIconDefault = useThemeColour('tabIconDefault');

  return (
    <Tabs
      screenOptions={({ route, navigation, theme }) => ({
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
        headerRight: () => <LoginStatus />,
        ...(typeof screenOptions === 'function' ? screenOptions({ route, navigation, theme }) : screenOptions),
      })}
    >
      {children}
    </Tabs>
  );
};