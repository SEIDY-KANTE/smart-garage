import DeviceType from './DeviceType';
import DeviceName from './DeviceName';
import { getDateAndTime, getFormattedTime } from '../../utils';

class Device {
  id: string;
  name: DeviceName;
  isOpen: boolean;
  autoLockIsOn: boolean;
  lockAfterMins: number;
  alertIsOn: boolean;
  alertAfterMins: number;
  lastActionTime: Date;
  constructor(deviceData: DeviceType) {
    this.id = deviceData.id;
    this.name = deviceData.name;
    this.isOpen = deviceData.isOpen;
    this.autoLockIsOn = deviceData.autoLockIsOn;
    this.lockAfterMins = deviceData.lockAfterMins;
    this.alertIsOn = deviceData.alertIsOn;
    this.alertAfterMins = deviceData.alertAfterMins;
    this.lastActionTime = deviceData.lastActionTime;
  }
}

export default Device;
