import { FlatList } from 'react-native';
import React from 'react';
import HistoryItem from './HistoryItem';
import { useDevices } from '../../../context/Device';

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
