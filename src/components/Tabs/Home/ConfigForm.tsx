import { Animated, StyleSheet, Text, View } from 'react-native';
import React, { FC, useEffect, useRef, useState } from 'react';
import Input from '../../UI/Input';
import { Switch } from '@ant-design/react-native';
import globalStyles from '../../../common';
import Button from '../../UI/Button';
import { Ionicons } from '@expo/vector-icons';

type ConfigFormProps = {
  isOpen: boolean;
  autoLockIsOn: boolean;
  lockAfterMins?: number;
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
  onSave,
  onCancel,
}) => {
  const [isOpenSelected, setIsOpenSelected] = useState(isOpen);
  const [error, setError] = useState('');
  const [autoLockIsTurnedOn, setAutoLockIsTurnedOn] = useState(autoLockIsOn);
  const [lockAfter, setLockAfter] = useState(lockAfterMins || 5);

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
    setIsOpenSelected((prev) => !prev);
  };

  const saveHandler = () => {
    if (autoLockIsOn && lockAfter < 1) {
      setError('Lock after must be greater than 0');
      return;
    }
    onSave(isOpenSelected, autoLockIsTurnedOn, lockAfter);
    setError('');
  };

  return (
    <View style={styles.formContainer}>
      <View style={[styles.flexContainer, { justifyContent: 'center' }]}>
        <Button
          style={{ width: 120 }}
          onPress={toggleState}
          color={isOpenSelected ? globalStyles.colors.green : 'orangered'}
        >
          <Text style={{ color: 'white' }}>{isOpen ? 'Open' : 'Close'}</Text>
        </Button>
      </View>
      <View style={styles.flexContainer}>
        <Text style={styles.text}>Auto-lock Mode</Text>
        <Switch
          defaultChecked
          checked={autoLockIsOn}
          onPress={() => setAutoLockIsTurnedOn((prev) => !prev)}
          style={{ marginLeft: 107 }}
        />
      </View>
      {autoLockIsOn && (
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
      <View style={styles.buttonContainer}>
        <Button onPress={saveHandler} color={globalStyles.colors.teal}>
          Save
        </Button>
        <Button onPress={onCancel} color="salmon">
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
    marginTop: 40,
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexContainer: {
    borderBottomColor: globalStyles.colors.subtleTeal3,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    padding: 8,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 20,
  },
  stateButton: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    width: '100%',
  },
});
