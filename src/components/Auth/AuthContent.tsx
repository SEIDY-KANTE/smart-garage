import { StyleSheet, Text, View } from 'react-native';
import React, { FC, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AuthForm, { FormValues } from './AuthForm';
import { validateEmail } from '../../utils/emailValidation';
import globalStyles from '../../common';
import Button from '../UI/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AuthStack';

type AuthContentProps = {
  isLogin: boolean;
  onLogin?: (email: string, password: string) => void;
  onSignup?: (email: string, password: string, username: string) => void;
};

export type FormValidity = {
  email: boolean;
  username: boolean;
  password: boolean;
  confirmPassword: boolean;
};

type LoginScreenProp = StackNavigationProp<RootStackParamList>;

const AuthContent: FC<AuthContentProps> = ({ isLogin, onLogin, onSignup }) => {
  const navigation = useNavigation<LoginScreenProp>();

  const switchAuthMode = () => {
    if (isLogin) {
      navigation.navigate('Signup');
    } else {
      navigation.navigate('Login');
    }
  };

  const [formValidity, setFormValidity] = useState<FormValidity>({
    email: true,
    username: true,
    password: true,
    confirmPassword: true,
  });

  const submitHandler = (formValues: FormValues) => {
    let { email, username, password, confirmPassword } = formValues;

    email = email.trim();
    username = username.trim();

    const emailIsValid = validateEmail(email);
    const passwordIsValid = password.length >= 6;
    const usernameIsValid = username.length >= 4;
    const passwordsAreMatching = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!passwordsAreMatching || !usernameIsValid))
    ) {
      alert('Please check your input');
      setFormValidity({
        email: emailIsValid,
        username: usernameIsValid,
        password: passwordIsValid,
        confirmPassword: passwordsAreMatching,
      });
      return;
    }

    if (onLogin) {
      onLogin(email, password);
    } else if (onSignup) {
      onSignup(email, password, username);
    }
  };
  return (
    <View style={styles.content}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        formValidity={formValidity}
      />
      <View style={styles.buttonContainer}>
        <Button color="purple" textColor="white" onPress={switchAuthMode}>
          {isLogin ? 'Sign up instead' : 'Login instead'}
        </Button>
      </View>
    </View>
  );
};

export default AuthContent;

const styles = StyleSheet.create({
  content: {
    marginTop: 64,
    backgroundColor: globalStyles.colors.gray3,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
