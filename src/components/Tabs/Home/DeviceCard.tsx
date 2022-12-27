import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { FC, useState } from 'react';
import globalStyles from '../../../common';
import Button from '../../UI/Button';
import Card from '../../UI/Card';
import { Ionicons } from '@expo/vector-icons';
import DeviceDetails from './DeviceDetails';
import { useDevices } from '../../../context/Device';
import { Actions } from '../../../context/Actions/DeviceActions';
import Device from '../../../models/Device/Device';
import { getFormattedTime } from '../../../utils';

type DeviceProps = {
  device: Device;
};

//We need to disable the button for a certain amount of time after an action is performed
//This is because thingspeak has a limit of 1 request per 15 seconds
const ACTION_INTERVAL = 15;

const DeviceCard: FC<DeviceProps> = ({ device }) => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { updateDevice, activateDevice } = useDevices();

  const showModal = () => setModalIsVisible(true);
  const hideModal = () => {
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, ACTION_INTERVAL * 1000);
    setModalIsVisible(false);
  };

  const onToggle = () => {
    activateDevice(device);
    updateDevice(device, Actions.TOGGLE);
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, ACTION_INTERVAL * 1000);
  };

  return (
    <Pressable onPress={showModal} disabled={isDisabled}>
      <Card title={device.name}>
        <View style={styles.detailsContainer}>
          <Ionicons name="golf-outline" size={24} color="salmon" />
          <Text
            style={[
              styles.detailsText,
              { marginRight: 150, fontSize: 18, fontWeight: 'bold' },
            ]}
          >
            {device?.isOpen ? 'Open' : 'Closed'}
          </Text>
        </View>
        <View
          style={[
            styles.detailsContainer,
            { justifyContent: 'space-around', marginRight: 10 },
          ]}
        >
          <Ionicons
            style={{ marginLeft: -35 }}
            name="recording-outline"
            size={24}
            color="salmon"
          />
          <Text style={styles.detailsText}>
            Last Action :{device.isOpen ? ' Opened at ' : ' Closed at '}
            {getFormattedTime(device.lastActionTime)}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={showModal} color={globalStyles.colors.teal}>
            <View style={styles.innerButtonContainer}>
              <View style={styles.buttonTextContainer}>
                <Text style={styles.buttonText}>Configure</Text>
              </View>
              <Ionicons name="build-outline" size={20} color="white" />
            </View>
          </Button>
          <Button
            onPress={onToggle}
            isDisabled={isDisabled}
            color={
              device.isOpen
                ? globalStyles.colors.gray2
                : globalStyles.colors.green
            }
            style={{ width: 120, height: 38 }}
          >
            {device.isOpen ? 'Close' : 'Open'}
          </Button>
          <DeviceDetails
            device={device}
            visible={modalIsVisible && !isDisabled}
            onCancel={hideModal}
          />
        </View>
      </Card>
    </Pressable>
  );
};

export default DeviceCard;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  buttonText: {
    fontFamily: globalStyles.fontFamily.secondary,
    fontSize: 16,
    color: globalStyles.colors.white,
  },
  buttonTextContainer: {
    marginRight: 8,
    marginBottom: -6,
  },
  innerButtonContainer: {
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  detailsContainer: {
    padding: 5,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailsText: {
    // marginLeft: -10,
    fontFamily: globalStyles.fontFamily.primary,
    fontSize: 14,
    color: globalStyles.colors.gray5,
  },
});
