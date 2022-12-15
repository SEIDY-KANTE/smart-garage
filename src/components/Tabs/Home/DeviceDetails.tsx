import { Image, Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { FC } from 'react';
import Button from '../../UI/Button';
import globalStyles from '../../../common';
import ConfigForm from './ConfigForm';

type DeviceDetailsProps = {
  name?: string;
  onClose: () => void;
  visible: boolean;
};

const DeviceDetails: FC<DeviceDetailsProps> = ({ name, visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.textContainer}>
        <Image
          style={styles.image}
          source={
            name == 'Garage Door'
              ? require('../../../../assets/images/garage.png')
              : require('../../../../assets/images/delivery-box.png')
          }
        />
        <Text style={styles.title}>{name}</Text>
        <ConfigForm onClose={onClose}/>
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
  },
  image: {
    width: 150,
    height: 150,
    margin: 20,
  },
});
