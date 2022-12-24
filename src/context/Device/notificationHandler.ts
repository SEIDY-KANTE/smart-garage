import * as Notifications from 'expo-notifications';
import Notification from '../../models/Notification/Notification';

export const notificationHandler = async (notification: Notification) => {
  Notifications.scheduleNotificationAsync({
    content: {
      title: notification.title,
      body: notification.description,
    },
    trigger: {
      seconds: 1,
    },
  });
};
