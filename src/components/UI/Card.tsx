import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import globalStyles from '../../common';
import Button from './Button';
import { Ionicons } from '@expo/vector-icons';
import { Switch } from '@ant-design/react-native';

export type Description = {
  state: string;
  lastAction: string;
};

type CardProps = {
  title: string;
  description?: Description;
  children: React.ReactNode;
};

const Card: FC<CardProps> = ({ title, description, children }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons
          name={title === 'Garage Door' ? 'car-sport' : 'cube-outline'}
          size={24}
          color="white"
        />
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.detailsContainer}>
          <Ionicons name="golf-outline" size={24} color="salmon" />
          <Text style={[styles.detailsText, { marginLeft: -45 }]}>
            State: {description?.state}
          </Text>
          <Switch defaultChecked onChange={() => console.log('toggle!')} />
        </View>
        <View
          style={[styles.detailsContainer, { justifyContent: 'space-around' }]}
        >
          <Ionicons
            style={{ marginLeft: -35 }}
            name="recording-outline"
            size={24}
            color="salmon"
          />
          <Text style={styles.detailsText}>
            Last Action: {description?.lastAction}
          </Text>
        </View>
      </View>
      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: globalStyles.colors.gray3,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  header: {
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: globalStyles.colors.salmon,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontFamily: globalStyles.fontFamily.primary,
    fontSize: 20,
    fontWeight: 'bold',
    color: globalStyles.colors.gray4,
    marginLeft: 10,
  },
  cardContent: {
    padding: 10,
  },
  detailsContainer: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailsText: {
    // marginLeft: -10,
    fontFamily: globalStyles.fontFamily.primary,
    fontSize: 14,
    color: globalStyles.colors.black,
  },
});
