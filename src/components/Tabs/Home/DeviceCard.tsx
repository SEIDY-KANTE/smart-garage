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

// type DeviceStackProps = StackNavigationProp<HomeStackParamList>;
const DeviceCard: FC<DeviceProps> = ({ device }) => {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  // const navigation = useNavigation<DeviceStackProps>();
  const { updateDevice } = useDevices();

  const showModal = () => setModalIsVisible(true);
  const hideModal = () => setModalIsVisible(false);

  const onToggle = () => {
    updateDevice(device, Actions.TOGGLE);
  };

  return (
    <Pressable onPress={showModal}>
      <Card title={device.name}>
        <View style={styles.detailsContainer}>
          <Ionicons name="golf-outline" size={24} color="salmon" />
          <Text style={[styles.detailsText, { marginLeft: -45 }]}>
            State: {device?.isOpen ? 'Open' : 'Closed'}
          </Text>
          <Button
            onPress={onToggle}
            color={
              device.isOpen
                ? globalStyles.colors.accent
                : globalStyles.colors.green
            }
          >
            {device.isOpen ? 'Close' : 'Open'}
          </Button>
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
            Last Action:
            {device.isOpen ? 'Opened at ' : 'Closed at '}
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
          <DeviceDetails
            device={device}
            visible={modalIsVisible}
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
    alignItems: 'flex-end',
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
    color: globalStyles.colors.black,
  },
});
