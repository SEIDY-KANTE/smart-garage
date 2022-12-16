import { Animated, Image, Modal, StyleSheet, Text, View } from 'react-native';
import React, { FC, useEffect, useRef } from 'react';
import globalStyles from '../../../common';
import ConfigForm from './ConfigForm';
import { useDevices } from '../../../context/device-context';
import DeviceName from '../../../models/Device/DeviceName';
import { Actions } from '../../../context/Actions/DeviceActions';

type DeviceDetailsProps = {
  name?: string;
  onCancel: () => void;
  visible: boolean;
};

const DeviceDetails: FC<DeviceDetailsProps> = ({ name, visible, onCancel }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { garageDoor, deliveryBox, updateDevice } = useDevices();

  const onSaveSettings = (
    isOpenSelected: boolean,
    autoLockIsTurnedOn: boolean,
    lockAfterMins: number
  ) => {
    if (name == DeviceName.GARAGE_DOOR) {
      if (isOpenSelected) return updateDevice(garageDoor, Actions.OPEN);
    }
    if (name == DeviceName.DELIVERY_BOX) {
      if (isOpenSelected) return updateDevice(deliveryBox, Actions.OPEN);
    }

    onCancel();
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.textContainer}>
        <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
          <Image
            style={styles.image}
            source={
              name == 'Garage Door'
                ? require('../../../../assets/images/garage.png')
                : require('../../../../assets/images/delivery-box.png')
            }
          />
          <Text style={styles.title}>{name}</Text>
        </Animated.View>
        <ConfigForm
          isOpen={
            (name === DeviceName.GARAGE_DOOR
              ? garageDoor?.isOpen
              : deliveryBox?.isOpen) || false
          }
          autoLockIsOn={
            (name === DeviceName.GARAGE_DOOR
              ? garageDoor?.autoLockIsOn
              : deliveryBox?.autoLockIsOn) || false
          }
          lockAfterMins={
            (name === DeviceName.GARAGE_DOOR
              ? garageDoor?.lockAfterMins
              : deliveryBox?.lockAfterMins) || 0
          }
          onSave={onSaveSettings}
          onCancel={onCancel}
        />
      </View>
    </Modal>
  );
};

export default DeviceDetails;

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalStyles.colors.subtleTeal2,
  },
  title: {
    fontFamily: globalStyles.fontFamily.secondary,
    fontSize: 24,
    color: globalStyles.colors.darkTeal,
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    margin: 20,
  },
});
