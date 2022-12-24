import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import globalStyles from '../../../common';
import UserAvatar from '../Profile/UserAvatar';
import { Ionicons } from '@expo/vector-icons';
import { getFormattedTime } from '../../../utils';

type HistoryItemProps = {
  device: string;
  state: string;
  timeStamp: Date;
  user: string;
};

const HistoryItem: FC<HistoryItemProps> = ({
  device,
  state,
  timeStamp,
  user,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.title}>
          <Ionicons
            name={device === 'Garage Door' ? 'car-sport' : 'cube-outline'}
            size={24}
            color={globalStyles.colors.accent}
          />
          <Text style={styles.device}>{device}</Text>
        </View>
        <View style={styles.details}>
          <Ionicons
            size={20}
            name={state === 'Opened' ? 'lock-open' : 'lock-closed'}
            color={globalStyles.colors.accent}
          />
          <Text style={styles.text}>{state}</Text>
          <Ionicons
            size={20}
            name="time-outline"
            color={globalStyles.colors.darkTeal}
          />
          <Text style={styles.text}>at {getFormattedTime(timeStamp)}</Text>
        </View>
      </View>
      <View style={styles.user}>
        <UserAvatar
          size={55}
          color={globalStyles.colors.subtleTeal3}
          username={user}
        />
        <Text style={styles.username}>by {user}</Text>
      </View>
    </View>
  );
};

export default HistoryItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyles.colors.subtleTeal,
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
    color: globalStyles.colors.darkTeal,
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
