import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import globalStyles from '../common';
import UnAuthorizedStack from '../screens/Auth/UnAuthorizedStack';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  UnAthorized: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: globalStyles.colors.teal },
        headerTintColor: globalStyles.colors.white,
        contentStyle: { backgroundColor: globalStyles.colors.subtleTeal2 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="UnAthorized" component={UnAuthorizedStack} />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
