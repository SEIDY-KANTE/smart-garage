import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import HistoryItem from './HistoryItem';
import History from '../../../models/History';
import { useDevices } from '../../../context/Device';

const histories = [
  {
    device: 'Garage Door',
    state: 'Opened',
    time: '12:00',
    user: 'Epix',
    id: 1,
  },
  {
    device: 'Delivery Box',
    state: 'Opened',
    time: '12:00',
    user: 'Cristian',
    id: 2,
  },
  {
    device: 'Garage Door',
    state: 'Opened',
    time: '12:00',
    user: 'Nkunku',
    id: 3,
  },
  {
    device: 'Delivery Box',
    state: 'Opened',
    time: '12:00',
    user: 'Bellingham',
    id: 4,
  },
  {
    device: 'Delivery Box',
    state: 'Closed',
    time: '12:00',
    user: 'Kane',
    id: 5,
  },
];

const HistoryTab = () => {
  const { usageHistory } = useDevices();

  return (
    <FlatList
      data={usageHistory}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <HistoryItem
          device={item.device}
          state={item.isOpen ? 'Opened' : 'Closed'}
          timeStamp={item.dateAndTime}
          user={item.user}
        />
      )}
    />
  );
};

export default HistoryTab;

const styles = StyleSheet.create({});
