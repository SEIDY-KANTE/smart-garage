import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DeviceCard from './DeviceCard';
import { useDevices } from '../../../context/Device';

type DeviceDetailsProps = {
  deviceName: string;
};

export type HomeStackParamList = {
  DevicesOverview: undefined;
  DeviceDetails: DeviceDetailsProps;
};

const Stack = createStackNavigator<HomeStackParamList>();

const Home = () => {
  const { garageDoor, deliveryBox } = useDevices();

  return (
    <View style={styles.container}>
      <DeviceCard device={garageDoor} />
      <DeviceCard device={deliveryBox} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
