import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/auth-context';
import AuthContent from '../components/Auth/AuthContent';

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

  if (isAuthenticating) return <Text>Authenticating...</Text>;

  return <AuthContent isLogin={true} onLogin={loginHandler} />;
};

export default LoginScreen;

const styles = StyleSheet.create({});
