import axios from 'axios';
import {
  DELIVERY_BOX_WRITE_API_URL,
  GARAGE_DOOR_WRITE_API_URL,
} from '../../config';
import { Command } from '../../config/Command';
import Device from '../../models/Device/Device';
import DeviceName from '../../models/Device/DeviceName';

export const turnOnAutoLock = (device: Device) => {
  device.autoLockIsOn = true;
  return device;
};

export const turnOffAutoLock = (device: Device) => {
  device.autoLockIsOn = false;
  return device;
};

export const setAutoLockTime = (device: Device, time: number) => {
  device.lockAfterMins = time;
  return device;
};

export const open = async (deviceName: string) => {
  const BASE_URL =
    deviceName === DeviceName.GARAGE_DOOR
      ? GARAGE_DOOR_WRITE_API_URL
      : DELIVERY_BOX_WRITE_API_URL;

  axios.post(`${BASE_URL}${Command.CLOSED}`);
};

export const close = async (deviceName: string) => {
  const BASE_URL =
    deviceName === DeviceName.GARAGE_DOOR
      ? GARAGE_DOOR_WRITE_API_URL
      : DELIVERY_BOX_WRITE_API_URL;

  axios.post(`${BASE_URL}${Command.CLOSED}`);
};
