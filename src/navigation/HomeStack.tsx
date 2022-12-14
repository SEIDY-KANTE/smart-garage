import React from 'react';
import { useAuth } from '../context/auth-context';
import UnAuthorizedStack from './UnAuthorizedStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, SettingsTab, ProfileTab, HistoryTab } from '../components/Tabs';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../common';
import IconButton from '../components/UI/IconButton';

export type BottomStackParamList = {
  Home: undefined;
  Settings: undefined;
  History: undefined;
  Profile: undefined;
};

const BottomTab = createBottomTabNavigator<BottomStackParamList>();
type HomeStackProps = BottomTabNavigationProp<BottomStackParamList>;

const HomeStack = () => {
  const { currentUser, logout } = useAuth();

  const navigation = useNavigation<HomeStackProps>();

  if (false) return <UnAuthorizedStack />;

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: globalStyles.colors.teal },
        headerTintColor: globalStyles.colors.white,
        tabBarStyle: { backgroundColor: globalStyles.colors.subtleTeal },
        tabBarActiveTintColor: globalStyles.colors.teal,
        headerRight: () => <IconButton onPress={navigateToProfile} />,
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
    </BottomTab.Navigator>
  );
};

export default HomeStack;
