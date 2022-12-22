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
  const { allDevices } = useDevices();

  return (
    <View style={styles.container}>
      <DeviceCard device={allDevices.garageDoor} />
      <DeviceCard device={allDevices.deliveryBox} />
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
