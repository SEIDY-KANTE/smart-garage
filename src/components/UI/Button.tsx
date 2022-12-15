import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { ReactNode } from 'react';
import globalStyles from '../../common';

interface IProps {
  children: ReactNode;
  onPress: () => void;
  color?: string;
  textColor?: string;
}

const Button = (props: IProps) => {
  const colorStyle = {
    color: props.textColor || globalStyles.colors.white,
    backgroundColor: props.color,
  };

  const containerStyle = [
    styles.button,
    {
      backgroundColor: props.color || globalStyles.colors.subtleTeal2,
    },
  ];

  return (
    <Pressable
      style={({ pressed }) => [containerStyle, pressed && styles.pressed]}
      onPress={props.onPress}
    >
      <View>
        <Text style={[styles.buttonText, colorStyle]}>{props.children}</Text>
      </View>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: globalStyles.colors.cyan,
    borderRadius: 5,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.75,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: globalStyles.fontFamily.primary,
  },
});
