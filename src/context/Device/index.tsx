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
import moment from 'moment';
import * as Notifications from 'expo-notifications';
import { IDevicesContext, IDevices } from './types';
import { notificationHandler } from './helper';
import { timeAgo } from '../../utils';

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

  useEffect(() => {
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
  }, [getHistory]);

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
  }, [getDevices, getNotifications]);

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
  }, [activeDevice, updateDeviceOnDb, addHistory]);

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
          id: (prevState.length + 1).toString(),
          device: activeDevice.name,
          isOpen: activeDevice.isOpen,
          user: 'epix',
          dateAndTime: new Date(),
        }),
        ...prevState,
      ];
    });
    setDeviceIsUpdated(false);
  }, [activeDevice, addHistory, deviceIsUpdated]);

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

    checkIfDeviceIsLeftOpen(device, action);
  };

  const checkIfDeviceIsLeftOpen = async (device: Device, action: Actions) => {
    if (device.alertIsOn && action === Actions.OPEN) {
      const notification = new Notification({
        id: (notifications.length + 1).toString(),
        title: 'Alert',
        description: `${
          device.name
        } was ${action.toLocaleLowerCase()} for more than ${
          device.alertAfterMins
        } minutes`,
        time: new Date(),
        isUnread: true,
      });
      console.log(device.alertAfterMins);

      setTimeout(async () => {
        console.log('checking if device is still open');
        const activeDeviceState = await fetchActiveDeviceState(activeDevice);
        const now = moment(new Date());
        const then = moment(activeDeviceState!.lastActionTime);
        const diffInMins = moment.duration(now.diff(then)).asMinutes();

        const deviceIsStillOpen = diffInMins > device.alertAfterMins;
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
