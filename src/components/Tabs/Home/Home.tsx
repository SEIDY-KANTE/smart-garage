import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Device from './Device';

type DeviceDetailsProps = {
  deviceName: string;
};

export type HomeStackParamList = {
  DevicesOverview: undefined;
  DeviceDetails: DeviceDetailsProps;
};

const Stack = createStackNavigator<HomeStackParamList>();

const Home = () => {
  return (
    <View style={styles.container}>
      <Device name="Garage Door" />
      <Device name="Delivery Box" />
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
