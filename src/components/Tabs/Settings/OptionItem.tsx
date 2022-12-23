import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { FC, useState } from 'react';
import globalStyles from '../../../common';
import { Ionicons } from '@expo/vector-icons';
import RolesModal from './RolesModal';

type OptionItemProps = {
  option: string;
  onPress: () => void;
  icon: 'people-outline' | 'analytics-outline' | 'cube-outline';
  modalIsVisible: boolean;
  onCancel?: () => void;
};

const OptionItem: FC<OptionItemProps> = ({
  option,
  icon,
  onPress,
  onCancel,
  modalIsVisible,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.innerContainer}>
        <Ionicons name={icon} size={20} color={globalStyles.colors.darkTeal} />
        <Text style={styles.text}>{option}</Text>
      </View>
      {onCancel && <RolesModal visible={modalIsVisible} onCancel={onCancel} />}
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
