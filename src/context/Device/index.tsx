import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
  FC,
} from 'react';
import Device from '../../models/Device/Device';
import { Actions } from '.././Actions/DeviceActions';
import { close, open } from '../../store/Devices';
import { GarageDoor, DeliveryBox } from './Devices';
import DeviceName from '../../models/Device/DeviceName';
import {
  addHistory,
  addNotification,
  fetchActiveDeviceState,
  getDevices,
  getHistory,
  getNotifications,
  updateDeviceOnDb,
} from '../Actions/dbActions';
import { useAuth } from '../auth-context';
import History from '../../models/History';
import Notification from '../../models/Notification/Notification';
import * as Notifications from 'expo-notifications';
import { IDevicesContext, IDevices } from './types';
import { notificationHandler } from './notificationHandler';
import { findDiffInMins } from '../../utils';

const DevicesContext = createContext<IDevicesContext>({
  allDevices: { garageDoor: GarageDoor, deliveryBox: DeliveryBox },
  activeDevice: GarageDoor,
  usageHistory: [],
  notifications: [],
  activateDevice: (device: Device) => {},
  updateDevice: (device: Device | null, action: Actions) => {},
});

export const useDevices = () => useContext(DevicesContext);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const DevicesContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [allDevices, setAllDevices] = useState<IDevices>({
    garageDoor: GarageDoor,
    deliveryBox: DeliveryBox,
  });
  const [activeDevice, setActiveDevice] = useState<Device>(
    allDevices.garageDoor
  );
  const [usageHistory, setUsageHistory] = useState<History[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [deviceIsUpdated, setDeviceIsUpdated] = useState<boolean>(false);

  const { currentUser } = useAuth();

  const activateDevice = (device: Device) => {
    setActiveDevice(device);
  };

  const checkIfDeviceIsLeftOpen = async (device: Device) => {
    const notification = new Notification({
      id: Date.now().toString(),
      title: 'Alert',
      description: `${device.name} was open for more than ${device.alertAfterMins} minutes`,
      time: new Date(),
      isUnread: true,
    });

    setTimeout(async () => {
      const deviceState = await fetchActiveDeviceState(device);
      const now = new Date();
      const then = new Date(deviceState!.lastActionTime);
      const diffInMins = findDiffInMins(then, now);

      const deviceIsStillOpen =
        deviceState!.isOpen && diffInMins > device.alertAfterMins;

      if (deviceIsStillOpen) {
        setNotifications((prevState) => {
          const newNotification = {
            ...notification,
            time: new Date(notification.time),
          };
          return [newNotification, ...prevState];
        });
        addNotification(notification);
        notificationHandler(notification);
      }
    }, device.alertAfterMins * 60 * 1000);
  };

  const engageAutoLockMode = (device: Device) => {
    const notification = new Notification({
      id: Date.now().toString(),
      title: 'Auto Lock Mode Engaged',
      description: `Auto Lock Mode Engaged for ${device.name}`,
      time: new Date(),
      isUnread: true,
    });

    setTimeout(async () => {
      const deviceState = await fetchActiveDeviceState(device);
      const now = new Date();
      const then = new Date(deviceState!.lastActionTime);
      const diffInMins = findDiffInMins(then, now);

      const deviceIsStillOpen =
        deviceState!.isOpen && diffInMins > device.lockAfterMins;

      if (!deviceIsStillOpen) return;
      setActiveDevice(device);
      updateDevice(device, Actions.CLOSE);
      setNotifications((prevState) => {
        const newNotification = {
          ...notification,
          time: new Date(notification.time),
        };
        return [newNotification, ...prevState];
      });
      addNotification(notification);
      notificationHandler(notification);
    }, device.lockAfterMins * 60 * 1000);
  };

  useEffect(() => {
    getDevices()
      .then((snapshot) => {
        const devices: any = {};
        snapshot.forEach((doc: any) => {
          const tempDevice = doc.data();
          tempDevice.id = doc.id;
          tempDevice.lastActionTime = new Date(tempDevice.lastActionTime);

          if (tempDevice.name == DeviceName.GARAGE_DOOR)
            devices.garageDoor = new Device(tempDevice);
          else devices.deliveryBox = new Device(tempDevice);
        });
        setAllDevices(devices);
      })
      .catch((err) => console.log(err));

    getNotifications()
      .then((snapshot) => {
        const nots: any = [];
        snapshot.forEach((doc: any) => {
          const docNot = doc.data();
          docNot.id = doc.id;
          console.log(docNot.time);
          docNot.time = new Date(docNot.time);
          nots.push(new Notification(docNot));
        });
        setNotifications(nots);
      })
      .catch((err) => console.log(err));

    getHistory()
      .then((snapshot) => {
        const history: any = [];
        snapshot.forEach((doc: any) => {
          const data = doc.data();
          data.id = doc.id;
          data.dateAndTime = new Date(data.dateAndTime);
          history.push(new History(data));
        });
        setUsageHistory(history);
      })
      .catch((err) => console.log(err));
  }, [getDevices, getNotifications, getHistory]);

  useEffect(() => {
    updateDeviceOnDb(activeDevice);

    function updateAllDevices() {
      setAllDevices((prevState) => {
        const newDeviceState =
          activeDevice.name == DeviceName.GARAGE_DOOR
            ? { garageDoor: { ...prevState.garageDoor, ...activeDevice } }
            : { deliveryBox: { ...prevState.deliveryBox, ...activeDevice } };
        return { ...prevState, ...newDeviceState };
      });
    }

    updateAllDevices();
  }, [activeDevice, updateDeviceOnDb]);

  useEffect(() => {
    if (!deviceIsUpdated) {
      return;
    }
    addHistory({
      device: activeDevice.name,
      isOpen: activeDevice.isOpen,
      user: 'epix',
      dateAndTime: new Date(),
    });

    setUsageHistory((prevState) => {
      return [
        new History({
          id: Date.now().toString(),
          device: activeDevice.name,
          isOpen: activeDevice.isOpen,
          user: 'epix',
          dateAndTime: new Date(),
        }),
        ...prevState,
      ];
    });
    setDeviceIsUpdated(false);

    if (activeDevice.alertIsOn) checkIfDeviceIsLeftOpen(activeDevice);
    if (activeDevice.autoLockIsOn) engageAutoLockMode(activeDevice);
  }, [
    activeDevice,
    addHistory,
    deviceIsUpdated,
    checkIfDeviceIsLeftOpen,
    engageAutoLockMode,
  ]);

  const updateDevice = async (device: Device, action: Actions) => {
    // update device on server
    if (!device) return;

    switch (action) {
      case Actions.OPEN:
        await open(device.name);
        setActiveDevice((prevState) => {
          return {
            ...prevState,
            isOpen: true,
            lastActionTime: new Date(),
          };
        });
        setDeviceIsUpdated(true);
        break;
      case Actions.CLOSE:
        await close(device.name);
        setActiveDevice((prevState) => {
          return {
            ...prevState,
            isOpen: false,
            lastActionTime: new Date(),
          };
        });
        setDeviceIsUpdated(true);
        break;
      case Actions.TOGGLE:
        if (device.isOpen) {
          updateDevice(device, Actions.CLOSE);
        } else {
          updateDevice(device, Actions.OPEN);
        }
        return;
      case Actions.UPDATE_SETTINGS:
        if (device.isOpen) {
          await open(device.name);
        } else {
          await close(device.name);
        }
        setActiveDevice({
          ...device,
          lastActionTime: new Date(),
        });
        setDeviceIsUpdated(true);
        break;
      default:
        break;
    }
  };

  return (
    <DevicesContext.Provider
      value={{
        allDevices,
        activeDevice,
        usageHistory,
        notifications,
        activateDevice,
        updateDevice,
      }}
    >
      {children}
    </DevicesContext.Provider>
  );
};

export default DevicesContextProvider;
