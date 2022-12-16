import DeviceName from "./DeviceName";

interface DeviceType {
    name: DeviceName;
    isOpen: boolean;
    autoLockIsOn: boolean;
    lockAfterMins: number;
} 

export default DeviceType;