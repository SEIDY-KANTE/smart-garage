import React from 'react';
import { useAuth } from '../context/auth-context';
import UnAuthorizedStack from '../screens/Auth/UnAuthorizedStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Home,
  SettingsTab,
  ProfileTab,
  HistoryTab,
  NotificationsTab,
} from '../components/Tabs';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import globalStyles from '../common';
import NotificationIcon from '../components/Tabs/Notifications/NotificationIcon';
import DevicesContextProvider from '../context/Device';

export type BottomStackParamList = {
  Home: undefined;
  Settings: undefined;
  History: undefined;
  Profile: undefined;
  Notifications: undefined;
};

const BottomTab = createBottomTabNavigator<BottomStackParamList>();
export type HomeStackProps = BottomTabNavigationProp<BottomStackParamList>;

const HomeStack = () => {
  const { currentUser } = useAuth();

  if (!currentUser?.isAuthorized) return <UnAuthorizedStack />;

  return (
    <DevicesContextProvider>
      <BottomTab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: globalStyles.colors.teal },
          headerTintColor: globalStyles.colors.white,
          tabBarStyle: { backgroundColor: globalStyles.colors.subtleTeal },
          tabBarActiveTintColor: globalStyles.colors.teal,
          headerRight: () => <NotificationIcon />,
        }}
      >
        <BottomTab.Screen
          name="Home"
          component={Home}
          options={{
            headerTitleStyle: {
              fontFamily: globalStyles.fontFamily.secondary,
              fontSize: 20,
            },
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <BottomTab.Screen
          name="History"
          component={HistoryTab}
          options={{
            headerTitleStyle: {
              fontFamily: globalStyles.fontFamily.secondary,
              fontSize: 20,
            },
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="sync-outline" color={color} size={size} />
            ),
          }}
        />
        {currentUser?.isAdmin && (
          <BottomTab.Screen
            name="Settings"
            component={SettingsTab}
            options={{
              headerTitleStyle: {
                fontFamily: globalStyles.fontFamily.secondary,
                fontSize: 20,
              },
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings" color={color} size={size} />
              ),
            }}
          />
        )}
        <BottomTab.Screen
          name="Profile"
          component={ProfileTab}
          options={{
            headerTitleStyle: {
              fontFamily: globalStyles.fontFamily.secondary,
              fontSize: 20,
            },
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Notifications"
          component={NotificationsTab}
          options={{
            headerTitleStyle: {
              fontFamily: globalStyles.fontFamily.secondary,
              fontSize: 20,
            },
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="notifications" color={color} size={size} />
            ),
          }}
        />
      </BottomTab.Navigator>
    </DevicesContextProvider>
  );
};

export default HomeStack;
