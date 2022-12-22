import { Animated, Image, Modal, StyleSheet, Text, View } from 'react-native';
import React, { FC, useEffect, useRef } from 'react';
import globalStyles from '../../../common';
import ConfigForm from './ConfigForm';
import { useDevices } from '../../../context/Device';
import { Actions } from '../../../context/Actions/DeviceActions';
import Device from '../../../models/Device/Device';

type DeviceDetailsProps = {
  device: Device;
  onCancel: () => void;
  visible: boolean;
};

const DeviceDetails: FC<DeviceDetailsProps> = ({
  device,
  onCancel,
  visible,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { updateDevice, activateDevice } = useDevices();

  const onSaveSettings = (
    isOpen: boolean,
    autoLockIsOn: boolean,
    lockAfterMins: number,
    alertIsOn: boolean,
    alertAfterMins: number
  ) => {
    activateDevice(device);
    updateDevice(
      {
        ...device,
        isOpen,
        autoLockIsOn,
        lockAfterMins,
        alertIsOn,
        alertAfterMins,
      },
      Actions.UPDATE_SETTINGS
    );
    
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
              device.name == 'Garage Door'
                ? require('../../../../assets/images/garage.png')
                : require('../../../../assets/images/delivery-box.png')
            }
          />
          <Text style={styles.title}>{device.name}</Text>
        </Animated.View>
        <ConfigForm
          isOpen={device.isOpen}
          autoLockIsOn={device.autoLockIsOn}
          lockAfterMins={device.lockAfterMins}
          alertIsOn={device.alertIsOn}
          alertAfterMins={device.alertAfterMins}
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
