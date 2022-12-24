import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import Notification from '../../../models/Notification/Notification';
import globalStyles from '../../../common';
import { getFormattedTime } from '../../../utils';

type Props = {
  item: Notification;
};

const NotificationItem: FC<Props> = ({ item }) => {
  const containerStyle = item.isUnread
    ? [
        styles.itemContainer,
        { backgroundColor: globalStyles.colors.subtleAccent2 },
      ]
    : styles.itemContainer;

  return (
    <View style={containerStyle}>
      {item.isUnread && <View style={styles.sideBar}></View>}
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{getFormattedTime(item.time)}</Text>
      </View>
    </View>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'white',
    padding: 10,
    margin: 2,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
  },
  sideBar: {
    width: 6,
    height: '100%',
    backgroundColor: 'red',
    marginRight: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: globalStyles.fontFamily.primary,
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    fontFamily: globalStyles.fontFamily.primary,
    width: 260,
  },
  time: {
    fontSize: 16,
    marginRight: 10,
  },
  timeContainer: {
    width: 100,
    alignItems: 'flex-end',
    // justifyContent: 'flex-end',
    // backgroundColor: 'red',
  },
});
