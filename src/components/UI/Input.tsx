import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import globalStyles from '../../common';

export type KeyboardTypeOptions =
  | 'default'
  | 'email-address'
  | 'number-pad'
  | 'phone-pad'
  | 'decimal-pad';

type InputProps = {
  label?: string;
  keyboardType?: KeyboardTypeOptions;
  secure?: boolean;
  onUpdateValue: (value: string) => void;
  value: string;
  isInvalid?: boolean;
  errorMessage?: string;
};

export enum InputType {
  EMAIL = 'email',
  PASSWORD = 'password',
  USERNAME = 'username',
  CONFIRM_PASSWORD = 'confirmPassword',
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, props.isInvalid && styles.invalid]}>
        {props.label}
      </Text>

      <TextInput
        style={[styles.input, props.isInvalid && styles.invalid]}
        keyboardType={props.keyboardType || 'default'}
        autoCapitalize="none"
        secureTextEntry={props.secure}
        onChangeText={props.onUpdateValue}
        value={props.value}
        placeholder={props.label}
      />
      {props.isInvalid && (
        <Text style={styles.error}>{props.errorMessage}</Text>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 19,
    marginBottom: 5,
    fontFamily: globalStyles.fontFamily.primary,
    color: globalStyles.colors.darkTeal,
  },
  input: {
    paddingVertical: 9,
    paddingHorizontal: 5,
    backgroundColor: globalStyles.colors.white,
    borderRadius: 5,
    fontSize: 16,
    fontFamily: globalStyles.fontFamily.primary,
  },
  invalid: {
    color: globalStyles.colors.orangered,
  },
  error: {
    color: globalStyles.colors.orangered,
    fontSize: 11,
    fontFamily: globalStyles.fontFamily.primary,
  },
});
