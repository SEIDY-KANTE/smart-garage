import IDevice from './IDevice';
import DeviceName from './DeviceName';

class Device implements IDevice{
  id: string;
  name: DeviceName;
  isOpen: boolean;
  autoLockIsOn: boolean;
  lockAfterMins: number;
  alertIsOn: boolean;
  alertAfterMins: number;
  lastActionTime: Date;
  constructor(deviceData: IDevice) {
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
