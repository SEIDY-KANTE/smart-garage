import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Button from '../components/UI/Button';
import { useAuth } from '../context/auth-context';

const UnAuthorizedStack = () => {
  const { logout } = useAuth();
  return (
    <View>
      <Text>You are not authorized to access this part of the app :(</Text>
      <Text>Please contact the admin</Text>
      <Button onPress={logout}>Logout</Button>
    </View>
  );
};

export default UnAuthorizedStack;

const styles = StyleSheet.create({});
