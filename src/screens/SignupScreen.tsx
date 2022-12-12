import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '../store/auth-context';
import AuthContent from '../components/Auth/AuthContent';

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

  return <AuthContent isLogin={false} onSignup={signupHandler} />;
};

export default SignupScreen;

const styles = StyleSheet.create({});
