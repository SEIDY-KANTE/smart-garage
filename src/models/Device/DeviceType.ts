import DeviceName from "./DeviceName";

interface DeviceType {
    id: string;
    name: DeviceName;
    isOpen: boolean;
    autoLockIsOn: boolean;
    lockAfterMins: number;
    alertIsOn: boolean;
    alertAfterMins: number;
    lastActionTime: Date;
} 

export default DeviceType;