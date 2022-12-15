import { StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '../../context/auth-context';
import AuthContent from '../../components/Auth/AuthContent';

const SignupScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const { signup } = useAuth();

  const signupHandler = async (
    email: string,
    password: string,
    username: string
  ) => {
    setIsAuthenticating(true);
    try {
      signup(email, password, username);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) return <Text>Authenticating...</Text>;

  return <AuthContent isLogin={false} onSignup={signupHandler} />;
};

export default SignupScreen;

const styles = StyleSheet.create({});
