import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  onPress: () => void;
}

const Button = (props: IProps) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={props.onPress}>
        <Text>{props.children}</Text>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
});
