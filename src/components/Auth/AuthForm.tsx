import { StyleSheet, Text, View } from 'react-native';
import React, { useState, FC } from 'react';
import { FormValidity } from './AuthContent';
import Input, { InputType } from '../UI/Input';
import Button from '../UI/Button';
import { ErrorMessages } from './ErrorMessages';
import { useAuth } from '../../context/auth-context';
import globalStyles from '../../common';

export type FormValues = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

type AuthFormProps = {
  isLogin: boolean;
  onSubmit: (formValues: FormValues) => void;
  formValidity: FormValidity;
};

const AuthForm: FC<AuthFormProps> = ({ isLogin, onSubmit, formValidity }) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredPassword, setIsEmailValid] = useState('');
  const [enteredConfirmPassword, setIsPasswordValid] = useState('');
  const { error } = useAuth();

  const {
    email: emailIsValid,
    username: usernameIsValid,
    password: passwordIsValid,
    confirmPassword: passwordsAreMatching,
  } = formValidity;

  const inputChangeHandler = (inputType: InputType, value: string) => {
    switch (inputType) {
      case InputType.EMAIL:
        setEnteredEmail(value);
        break;
      case InputType.USERNAME:
        setEnteredUsername(value);
        break;
      case InputType.PASSWORD:
        setIsEmailValid(value);
        break;
      case InputType.CONFIRM_PASSWORD:
        setIsPasswordValid(value);
        break;
    }
  };

  const submitHandler = () => {
    onSubmit({
      email: enteredEmail,
      username: enteredUsername,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  };

  return (
    <View style={styles.container}>
      <Input
        label="Email Address"
        value={enteredEmail}
        onUpdateValue={inputChangeHandler.bind(this, InputType.EMAIL)}
        isInvalid={!emailIsValid}
        keyboardType="email-address"
        errorMessage={ErrorMessages.invalidEmail}
      />
      {!isLogin && (
        <Input
          label="Username"
          value={enteredUsername}
          onUpdateValue={inputChangeHandler.bind(this, InputType.USERNAME)}
          isInvalid={!usernameIsValid}
          errorMessage={ErrorMessages.username}
        />
      )}
      <Input
        label="Password"
        value={enteredPassword}
        onUpdateValue={inputChangeHandler.bind(this, InputType.PASSWORD)}
        isInvalid={!passwordIsValid}
        secure={true}
        errorMessage={ErrorMessages.weakPassword}
      />
      {!isLogin && (
        <Input
          label="Confirm Password"
          value={enteredConfirmPassword}
          onUpdateValue={inputChangeHandler.bind(
            this,
            InputType.CONFIRM_PASSWORD
          )}
          isInvalid={!passwordsAreMatching}
          secure={true}
          errorMessage={ErrorMessages.passwordMismatch}
        />
      )}
      {error && <Text style={styles.error}>{error}</Text>}
      <View style={styles.buttonContainer}>
        <Button onPress={submitHandler}>
          {isLogin ? 'Login' : 'Create Account'}
        </Button>
      </View>
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
  error: {
    color: globalStyles.colors.orangered,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 15,
  },
});
