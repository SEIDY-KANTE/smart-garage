import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import React from 'react';
import HistoryItem from './HistoryItem';

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
  return (
    <FlatList
      data={histories}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <HistoryItem
          device={item.device}
          state={item.state}
          dateAndTime={item.time}
          user={item.user}
        />
      )}
    />
  );
};

export default HistoryTab;

const styles = StyleSheet.create({});
