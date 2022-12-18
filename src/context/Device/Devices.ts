import DeviceName from '../../models/Device/DeviceName';
import Device from '../../models/Device/Device';

export const GarageDoor = new Device({
  id: "1",
  name: DeviceName.GARAGE_DOOR,
  isOpen: false,
  autoLockIsOn: false,
  lockAfterMins: 5,
  alertIsOn: false,
  alertAfterMins: 5,
  lastActionTime: new Date(),
});

export const DeliveryBox = new Device({
  id: "2",
  name: DeviceName.DELIVERY_BOX,
  isOpen: false,
  autoLockIsOn: false,
  lockAfterMins: 5,
  alertIsOn: false,
  alertAfterMins: 5,
  lastActionTime: new Date(),
});
