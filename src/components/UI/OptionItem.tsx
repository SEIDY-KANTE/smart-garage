import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import globalStyles from '../../common';
import { Ionicons } from '@expo/vector-icons';

type OptionItemProps = {
  option: string;
  onPress: () => void;
  icon: "people-outline" | "analytics-outline" | "cube-outline";
};

const OptionItem: FC<OptionItemProps> = ({ option, icon, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.innerContainer}>
        <Ionicons name={icon} size={20} color={globalStyles.colors.darkTeal}/>
        <Text style={styles.text}>{option}</Text>
      </View>
    </Pressable>
  );
};

export default OptionItem;

const styles = StyleSheet.create({
  innerContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontFamily: globalStyles.fontFamily.primary,
    color: globalStyles.colors.black,
    marginLeft: 15,
  },
  pressed: {
    opacity: 0.5,
  },
});
