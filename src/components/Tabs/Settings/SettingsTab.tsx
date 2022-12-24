import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import OptionItem from './OptionItem';

const SettingsTab = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  return (
    <View style={styles.container}>
      <OptionItem
        option="Manage access"
        onPress={() => setModalIsVisible(true)}
        onCancel={() => setModalIsVisible(false)}
        icon="people-outline"
        modalIsVisible={modalIsVisible}
      />
      <OptionItem
        option="Activities"
        onPress={() => console.log('clicked')}
        icon="analytics-outline"
        modalIsVisible={false}
      />
      <OptionItem
        option="Devices"
        onPress={() => console.log('clicked')}
        icon="cube-outline"
        modalIsVisible={false}
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
