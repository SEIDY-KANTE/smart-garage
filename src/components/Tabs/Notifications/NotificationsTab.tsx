import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import NotificationItem from './NotificationItem';

const NOTIFICATIONS = [
  {
    id: 1,
    title: 'New message',
    description: 'You have a new message from John Doe',
    time: '2 hours ago',
  },
  {
    id: 2,
    title: 'New message',
    description: 'You have a new message from John Doe',
    time: '2 hours ago',
  },
  {
    id: 3,
    title: 'New message',
    description: 'You have a new message from John Doe',
    time: '2 hours ago',
  },
  {
    id: 4,
    title: 'New message',
    description: 'You have a new message from John Doe',
    time: '2 hours ago',
  },
  {
    id: 5,
    title: 'New message',
    description: 'You have a new message from John Doe',
    time: '2 hours ago',
  },
];
const NotificationsTab = () => {
  return (
    <View style={styles.container}>
      <NotificationItem></NotificationItem>
      <NotificationItem></NotificationItem>
      <NotificationItem></NotificationItem>
    </View>
  );
};

export default NotificationsTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
