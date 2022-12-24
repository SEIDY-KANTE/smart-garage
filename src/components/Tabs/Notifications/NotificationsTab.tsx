import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import NotificationItem from './NotificationItem';
import Notification from '../../../models/Notification/Notification';
import { useDevices } from '../../../context/Device';

const NotificationsTab = () => {
  const { notifications } = useDevices();

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default NotificationsTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
