import React, {
  createContext,
  useEffect,
  useState,
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
  getDevices,
  getHistory,
  updateDeviceOnDb,
} from '../Actions/dbActions';
import { useAuth } from '../auth-context';
import History from '../../models/History';

interface IDevices {
  garageDoor: Device;
  deliveryBox: Device;
}
interface IDevicesContext {
  allDevices: IDevices;
  activeDevice: Device;
  usageHistory: History[];
  activateDevice: (device: Device) => void;
  updateDevice: (device: Device, action: Actions) => void;
}

const DevicesContext = createContext<IDevicesContext>({
  allDevices: { garageDoor: GarageDoor, deliveryBox: DeliveryBox },
  activeDevice: GarageDoor,
  usageHistory: [],
  activateDevice: (device: Device) => {},
  updateDevice: (device: Device | null, action: Actions) => {},
});

export const useDevices = () => React.useContext(DevicesContext);

const DevicesContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [allDevices, setAllDevices] = useState<IDevices>({
    garageDoor: GarageDoor,
    deliveryBox: DeliveryBox,
  });
  const [activeDevice, setActiveDevice] = useState<Device>(
    allDevices.garageDoor
  );
  const [usageHistory, setUsageHistory] = useState<History[]>([]);

  const { currentUser } = useAuth();

  const activateDevice = (device: Device) => {
    setActiveDevice(device);
  };

  const fetchDevices = async () => {
    // fetch devices from server
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
  };

  const fetchHistory = () => {
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
        console.log(usageHistory);
      })
      .catch((err) => console.log(err));
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
    // fetchHistory();
  }, [fetchDevices(), getDevices]);

  useEffect(() => {
    updateDeviceOnDb(activeDevice);

    addHistory({
      device: activeDevice!.name,
      isOpen: activeDevice!.isOpen,
      user: 'epix',
      dateAndTime: new Date(),
    });

    function updateAllDevices() {
      setAllDevices((prevState) => {
        const newDeviceStates =
          activeDevice.name == DeviceName.GARAGE_DOOR
            ? { garageDoor: { ...prevState.garageDoor, ...activeDevice } }
            : { deliveryBox: { ...prevState.deliveryBox, ...activeDevice } };
        return { ...prevState, ...newDeviceStates };
      });
    }

    updateAllDevices();
  }, [activeDevice, updateDeviceOnDb]);

  const updateDevice = async (device: Device, action: Actions) => {
    // update device on server
    if (!device) return;

    switch (action) {
      case Actions.OPEN:
        await open(activeDevice!.name);
        setActiveDevice((prevState) => {
          return {
            ...prevState,
            isOpen: true,
            lastActionTime: new Date(),
          };
        });

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
        break;
      case Actions.TOGGLE:
        if (device.isOpen) {
          updateDevice(device, Actions.CLOSE);
        } else {
          updateDevice(device, Actions.OPEN);
        }
        break;
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
        activateDevice,
        updateDevice,
      }}
    >
      {children}
    </DevicesContext.Provider>
  );
};

export default DevicesContextProvider;
