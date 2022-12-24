import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/auth-context';
import AuthContent from '../../components/Auth/AuthContent';
import AppLoading from 'expo-app-loading';

const LoginScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const { login } = useAuth();

  const loginHandler = async (email: string, password: string) => {
    setIsAuthenticating(true);
    try {
      login(email, password);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) return <AppLoading />;

  return <AuthContent isLogin={true} onLogin={loginHandler} />;
};

export default LoginScreen;

const styles = StyleSheet.create({});
