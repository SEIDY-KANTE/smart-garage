import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import globalStyles from '../../common';
import UserAvatar from './UserAvatar';
import { Ionicons } from '@expo/vector-icons';

type HistoryItemProps = {
  device: string;
  state: string;
  time: string;
  user: string;
};

const HistoryItem: FC<HistoryItemProps> = ({ device, state, time, user }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.title}>
          <Ionicons
            name={device === 'Garage Door' ? 'car-sport' : 'cube-outline'}
            size={24}
            color={globalStyles.colors.darkTeal}
          />
          <Text style={styles.device}>{device}</Text>
        </View>
        <View style={styles.details}>
          <Ionicons
            size={20}
            name={state === 'Opened' ? 'lock-open' : 'lock-closed'}
            color={globalStyles.colors.darkTeal}
          />
          <Text style={styles.text}>{state}</Text>
          <Ionicons
            size={20}
            name="time-outline"
            color={globalStyles.colors.darkTeal}
          />
          <Text style={styles.text}>at {time}</Text>
        </View>
      </View>
      <View style={styles.user}>
        <UserAvatar size={55} color={globalStyles.colors.subtleTeal3} />
        <Text style={styles.username}>by {user}</Text>
      </View>
    </View>
  );
};

export default HistoryItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyles.colors.subtleAccent2,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    elevation: 6,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    width: '56%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  user: {
    alignItems: 'flex-end',
  },
  device: {
    fontSize: 20,
    fontFamily: globalStyles.fontFamily.primary,
    color: globalStyles.colors.darkTeal,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innerContainer: {
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },
  text: {
    fontFamily: globalStyles.fontFamily.primary,
    color: globalStyles.colors.black,
    fontSize: 15,
    marginRight: 42,
  },
  username: {
    // fontFamily: globalStyles.fontFamily.primary,
    fontFamily: 'Ubuntu_300Light_Italic',
    color: globalStyles.colors.darkTeal,
    fontSize: 15,
  },
});
