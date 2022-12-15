import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { FC, useState } from 'react';
import globalStyles from '../../../common';
import Button from '../../UI/Button';
import Card from '../../UI/Card';
import { Ionicons } from '@expo/vector-icons';
import DeviceDetails from './DeviceDetails';
import { Switch } from '@ant-design/react-native';

type DeviceProps = {
  name: string;
};

// type DeviceStackProps = StackNavigationProp<HomeStackParamList>;

const Device: FC<DeviceProps> = ({ name }) => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  // const navigation = useNavigation<DeviceStackProps>();
  const showModal = () => setModalIsVisible(true);
  const hideModal = () => setModalIsVisible(false);

  return (
    <Pressable onPress={showModal}>
      <Card
        title={name}
      >
        <View style={styles.detailsContainer}>
          <Ionicons name="golf-outline" size={24} color="salmon" />
          <Text style={[styles.detailsText, { marginLeft: -45 }]}>
            State: 'Open'
          </Text>
          <Switch defaultChecked onChange={() => console.log('toggle!')} />
        </View>
        <View
          style={[styles.detailsContainer, { justifyContent: 'space-around' }]}
        >
          <Ionicons
            style={{ marginLeft: -35 }}
            name="recording-outline"
            size={24}
            color="salmon"
          />
          <Text style={styles.detailsText}>
            Last Action: Opened at 12:00 PM
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
            name={name}
            visible={modalIsVisible}
            onClose={hideModal}
          />
        </View>
      </Card>
    </Pressable>
  );
};

export default Device;

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
