import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import User from '../../models/User/User';
import globalStyles from '../../common';
import Button from '../UI/Button';

type UserListItemProps = {
  user: User;
  onToggle: (userID: string) => void;
};

const UserListItem: FC<UserListItemProps> = ({ user, onToggle }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.username}>{user.username}</Text>
      <Button
        onPress={onToggle.bind(this, user.uid)}
        color={
          user.isAuthorized
            ? globalStyles.colors.red
            : globalStyles.colors.green
        }
      >
        {user.isAuthorized ? 'Deny ' : 'Allow'}
      </Button>
    </View>
  );
};

export default UserListItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    elevation: 5,
    borderRadius: 6,
    backgroundColor: globalStyles.colors.subtleTeal,
  },
  username: {
    fontSize: 20,
    fontFamily: globalStyles.fontFamily.primary,
    color: globalStyles.colors.darkTeal,
  },
});
