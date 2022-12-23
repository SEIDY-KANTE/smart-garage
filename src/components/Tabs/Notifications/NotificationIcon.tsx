import { Pressable, StyleSheet, Text } from 'react-native';
import React, { FC } from 'react';
import IconBadge from 'react-native-icon-badge';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { HomeStackProps } from '../../../navigation/HomeStack';

const NotificationIcon = () => {
  const navigation = useNavigation<HomeStackProps>();

  return (
    <Pressable
      onPress={() => navigation.navigate('Notifications')}
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
    </Pressable>
  );
};

export default NotificationIcon;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
  container: {},
});
