import { Text, View } from 'react-native';
import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  FC,
} from 'react';
import Device from '../models/Device/Device';
import { Actions } from './Actions/DeviceActions';
import DeviceName from '../models/Device/DeviceName';
import { close, open } from '../store/Devices';

interface IDevicesContext {
  garageDoor: Device | null;
  deliveryBox: Device | null;
  updateDevice: (device: Device | null, action: Actions) => void;
  isLoading: boolean;
}

const DevicesContext = createContext<IDevicesContext>({
  garageDoor: new Device({
    name: DeviceName.GARAGE_DOOR,
    isOpen: false,
    autoLockIsOn: false,
    lockAfterMins: 5,
  }),
  deliveryBox: new Device({
    name: DeviceName.DELIVERY_BOX,
    isOpen: false,
    autoLockIsOn: false,
    lockAfterMins: 5,
  }),
  updateDevice: (device: Device | null, action: Actions) => {},
  isLoading: true,
});

export const useDevices = () => React.useContext(DevicesContext);

const DevicesContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [garageDoor, setGarageDoor] = useState<Device | null>(null);
  const [deliveryBox, setDeliveryBox] = useState<Device | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // fetch devices from server
  }, []);

  const updateDevice = async (device: Device | null, action: Actions) => {
    // update device on server
    if (!device) return;
    switch (action) {
      case Actions.OPEN:
        setIsLoading(true);
        await open(device.name);
        device.isOpen = true;
        setIsLoading(false);
        break;
      case Actions.CLOSE:
        setIsLoading(true);
        await close(device.name);
        device.isOpen = false;
        setIsLoading(false);
        break;
      case Actions.SET_AUTO_LOCK:
        break;
      default:
        break;
    }
  };
  return (
    <DevicesContext.Provider
      value={{
        garageDoor,
        deliveryBox,
        isLoading,
        updateDevice,
      }}
    >
      {children}
    </DevicesContext.Provider>
  );
};

export default DevicesContextProvider;
