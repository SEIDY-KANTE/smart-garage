import Device from '../../models/Device/Device';
import { db } from '../../store/firebase';
import History from '../../models/History';

export const getDb = () => {
  return db;
};

export const getDevices = async () => {
  return db.collection('devices').get();
};

export const getAllUsers = async () => {
  return db.collection('users').where('isAdmin', '==', false).get();
};

export const updateUserCredentials = async (user: any) => {
  db.collection('users')
    .where('userID', '==', user.uid)
    .get()
    .then((data) => {
      const userDocID = data.docs[0].id;
      db.collection('users')
        .doc(userDocID)
        .update({ ...user });
    });
};

export const getHistory = async () => {
  return db
    .collection('history')
    .orderBy('dateAndTime', 'desc')
    .limit(10)
    .get();
};

export const getNotifications = async () => {
  return db.collection('notifications').orderBy('time', 'desc').limit(10).get();
};

export const getDeviceByName = async (name: string) => {
  return db.collection('devices').where(name, '==', 'name').get();
};

export const updateDeviceOnDb = async (device: Device | null) => {
  if (!device) return;

  return await db
    .collection('devices')
    .doc(device.id)
    .update({ ...device, lastActionTime: device.lastActionTime.toString() });
};

export const addHistory = async (newHistory: any) => {
  return await db
    .collection('history')
    .add({ ...newHistory, dateAndTime: newHistory.dateAndTime.toString() });
};

export const addNotification = async (newNotification: any) => {
  return await db.collection('notifications').add({
    ...newNotification,
    time: new Date().toString(),
  });
};

export const fetchActiveDeviceState = async (device: Device) => {
  return db
    .collection('devices')
    .doc(device.id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        return null;
      }
    });
};
