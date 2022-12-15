import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import Input from '../../UI/Input';
import { Switch } from '@ant-design/react-native';
import globalStyles from '../../../common';
import Button from '../../UI/Button';

type ConfigFormProps = {
  onClose: () => void;
  // onSave: () => void;
};

const ConfigForm: FC<ConfigFormProps> = ({ onClose }) => {
  return (
    <View style={styles.formContainer}>
      <Switch defaultChecked onPress={() => {}} />
      <Input
        label="Lock After (minutes)"
        value="1"
        onUpdateValue={() => {}}
        keyboardType="number-pad"
      />
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => console.log('save')}
          color={globalStyles.colors.teal}
        >
          Save
        </Button>
        <Button onPress={onClose} color="salmon">
          Close
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
    backgroundColor: globalStyles.colors.subtleAccent,
    padding: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 5,
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
