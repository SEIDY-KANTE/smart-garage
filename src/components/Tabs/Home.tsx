import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import globalStyles from '../../common';
import Button from '../UI/Button';
import { Ionicons } from '@expo/vector-icons';
import Card from '../UI/Card';

const Home = () => {
  return (
    <View style={styles.container}>
      <Card
        title="Garage Door"
        description={{ state: 'Open', lastAction: 'Opened at 05:00AM' }}
      >
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => console.log('pressed')}
            color={globalStyles.colors.teal}
          >
            <View style={styles.innerButtonContainer}>
              <View style={styles.buttonTextContainer}>
                <Text style={styles.buttonText}>Configure</Text>
              </View>
              <Ionicons name="build-outline" size={24} color="white" />
            </View>
          </Button>
        </View>
      </Card>
      <Card
        title="Delivery Box"
        description={{ state: 'Open', lastAction: 'Opened at 05:00AM' }}
      >
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => console.log('pressed')}
            color={globalStyles.colors.teal}
          >
            <View style={styles.innerButtonContainer}>
              <View style={styles.buttonTextContainer}>
                <Text style={styles.buttonText}>Configure</Text>
              </View>
              <Ionicons name="build-outline" size={24} color="white" />
            </View>
          </Button>
        </View>
      </Card>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

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
});
