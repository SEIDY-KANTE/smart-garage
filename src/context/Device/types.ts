import Device from '../../models/Device/Device';
import History from '../../models/History';
import { Actions } from '../Actions/DeviceActions';
import Notification from '../../models/Notification/Notification';

export interface IDevices {
  garageDoor: Device;
  deliveryBox: Device;
}

export interface IDevicesContext {
  allDevices: IDevices;
  activeDevice: Device;
  usageHistory: History[];
  notifications: Notification[];
  activateDevice: (device: Device) => void;
  updateDevice: (device: Device, action: Actions) => void;
}
