import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useAuth } from '../context/auth-context';
import UnAuthorizedStack from './UnAuthorizedStack';
import Button from '../components/UI/Button';

const HomeStack = () => {
  const { currentUser, logout } = useAuth();

  if (false) return <UnAuthorizedStack />;

  return (
    <SafeAreaView>
      
    </SafeAreaView>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
