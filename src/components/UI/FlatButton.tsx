import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { ReactNode } from 'react';
import globalStyles from '../../common';

interface IProps {
  children: ReactNode;
  onPress: () => void;
}

const FlatButton = (props: IProps) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={props.onPress}
    >
      <View>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </Pressable>
  );
};

export default FlatButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: globalStyles.colors.blue,
  },
});
