import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import OptionItem from '../UI/OptionItem';

const SettingsTab = () => {
  return (
    <View style={styles.container}>
      <OptionItem
        option="Manage roles"
        onPress={() => console.log('clicked')}
        icon="people-outline"
      />
      <OptionItem
        option="Activities"
        onPress={() => console.log('clicked')}
        icon="analytics-outline"
      />
      <OptionItem
        option="Devices"
        onPress={() => console.log('clicked')}
        icon="cube-outline"
      />
    </View>
  );
};

export default SettingsTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
});
