import { Animated, StyleSheet, Text, View } from 'react-native';
import React, { FC, useEffect, useRef, useState } from 'react';
import Input from '../../UI/Input';
import { Switch } from '@ant-design/react-native';
import globalStyles from '../../../common';
import Button from '../../UI/Button';
import { Ionicons } from '@expo/vector-icons';
import { Actions } from '../../../context/Actions/DeviceActions';

type ConfigFormProps = {
  isOpen: boolean;
  autoLockIsOn: boolean;
  alertIsOn: boolean;
  lockAfterMins?: number;
  alertAfterMins?: number;
  onCancel: () => void;
  onSave: (
    isOpenSelected: boolean,
    autoLockIsTurnedOn: boolean,
    lockAfterMins: number
  ) => void;
};

const ConfigForm: FC<ConfigFormProps> = ({
  isOpen,
  autoLockIsOn,
  lockAfterMins,
  alertIsOn,
  alertAfterMins,
  onSave,
  onCancel,
}) => {
  const [opened, setOpened] = useState(isOpen);
  const [error, setError] = useState('');
  const [autoLockIsTurnedOn, setAutoLockIsTurnedOn] = useState(autoLockIsOn);
  const [lockAfter, setLockAfter] = useState(lockAfterMins || 5);
  const [alertIsTurnedOn, setAlertIsTurnedOn] = useState(alertIsOn);
  const [alertMins, setAlertMins] = useState(alertAfterMins || 5);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const updateLockAfter = (value: string) => {
    if (value === '') {
      setLockAfter(0);
      return;
    }
    setLockAfter(parseInt(value));
  };

  const toggleState = () => {
    setOpened((prev) => !prev);
  };

  const saveHandler = () => {
    if (autoLockIsOn && lockAfter < 1) {
      setError('Lock after must be greater than 0');
      return;
    }
    onSave(opened, autoLockIsTurnedOn, lockAfter);
    setError('');
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.flexContainer}>
        <Text style={styles.text}>State</Text>
        <Switch
          style={{ marginLeft: 20 }}
          checkedChildren="Open"
          unCheckedChildren="Closed"
          onChange={toggleState}
          checked={opened}
        />
      </View>
      <View style={styles.flexContainer}>
        <Text style={styles.text}>Auto-lock</Text>
        <Switch
          defaultChecked
          checked={autoLockIsOn}
          onPress={() => setAutoLockIsTurnedOn((prev) => !prev)}
          checkedChildren="On"
          unCheckedChildren="Off"
        />
      </View>
      {autoLockIsTurnedOn && (
        <Animated.View style={{ opacity: fadeAnim }}>
          <Input
            label="Lock After (minutes)"
            value={lockAfter?.toString()}
            onUpdateValue={updateLockAfter}
            keyboardType="number-pad"
            isInvalid={!!error}
            errorMessage={error}
          />
        </Animated.View>
      )}
      <View style={styles.flexContainer}>
        <Text style={styles.text}>Alert</Text>
        <Switch
          defaultChecked
          checked={alertIsTurnedOn}
          onPress={() => setAlertIsTurnedOn((prev) => !prev)}
          checkedChildren="On"
          unCheckedChildren="Off"
        />
      </View>
      {alertIsTurnedOn && (
        <Animated.View style={{ opacity: fadeAnim }}>
          <Input
            label="Lock After (minutes)"
            value={alertMins?.toString()}
            onUpdateValue={updateLockAfter}
            keyboardType="number-pad"
            isInvalid={!!error}
            errorMessage={error}
          />
        </Animated.View>
      )}
      <View style={styles.buttonContainer}>
        <Button
          style={{ width: '35%' }}
          onPress={saveHandler}
          color={globalStyles.colors.teal}
        >
          Save
        </Button>
        <Button style={{ width: '35%' }} onPress={onCancel} color="salmon">
          Cancel
        </Button>
      </View>
    </View>
  );
};

export default ConfigForm;

const styles = StyleSheet.create({
  formContainer: {
    width: '90%',
    alignItems: 'center',
    backgroundColor: globalStyles.colors.gray3,
    padding: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  flexContainer: {
    borderBottomColor: globalStyles.colors.subtleTeal3,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 8,
  },
  text: {
    fontSize: 20,
    marginVertical: 5,
    marginLeft: 20,
  },
});
