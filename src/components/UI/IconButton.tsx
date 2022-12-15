import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import IconBadge from 'react-native-icon-badge';
import { Ionicons } from '@expo/vector-icons';

interface IProps {
  onPress: () => void;
}

const IconButton: FC<IProps> = ({ onPress }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => pressed && styles.pressed}
  >
    <IconBadge
      MainElement={
        <Ionicons name="notifications-outline" size={36} color="white" />
      }
      BadgeElement={<Text>1</Text>}
      IconBadgeStyle={{
        width: 20,
        height: 20,
        backgroundColor: 'salmon',
        marginTop: -3,
      }}
    ></IconBadge>
    {/* <Text>Home</Text> */}
  </Pressable>
);

export default IconButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
  container: {},
});
