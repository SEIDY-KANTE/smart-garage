import DeviceType from "./DeviceType";
import DeviceName from "./DeviceName";

class Device{
    name: DeviceName;
    isOpen: boolean;
    autoLockIsOn: boolean;
    lockAfterMins: number;
    constructor(deviceData: DeviceType){
        this.name = deviceData.name;
        this.isOpen = deviceData.isOpen;
        this.autoLockIsOn = deviceData.autoLockIsOn;
        this.lockAfterMins = deviceData.lockAfterMins;
    }
}

export default Device;