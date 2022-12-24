import { StyleSheet, Text, View, Modal, FlatList } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import globalStyles from '../../../common';
import Button from '../../UI/Button';
import User from '../../../models/User/User';
import {
  getAllUsers,
  updateUserCredentials,
} from '../../../context/Actions/dbActions';
import UserListItem from './UserListItem';

type RolesModalProps = {
  visible: boolean;
  onCancel: () => void;
};

const SettingsModal: FC<RolesModalProps> = ({ visible, onCancel }) => {
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    getAllUsers().then((snapshot) => {
      const users: User[] = [];
      snapshot.forEach((doc) => {
        const userInfo = doc.data();

        users.push(
          new User({
            uid: userInfo.userID,
            email: userInfo.email,
            username: userInfo.username,
            isAdmin: userInfo.isAdmin,
            isAuthorized: userInfo.isAuthorized,
          })
        );
      });
      setAllUsers(users);
    });
  }, []);

  const saveHandler = () => {
    allUsers.forEach((user) => {
      updateUserCredentials(user);
    });
    onCancel();
  };

  const toggleUserDetails = (userID: string) => {
    const updatedUsers = allUsers.map((user) => {
      if (user.uid === userID) {
        return { ...user, isAuthorized: !user.isAuthorized };
      }
      return user;
    });
    setAllUsers(updatedUsers);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Manage Access</Text>
        <View style={styles.header}>
          <Text style={styles.headerText}>Users</Text>
          <Text style={styles.headerText}>Access</Text>
        </View>
        <FlatList
          style={{ width: '100%' }}
          data={allUsers}
          keyExtractor={(item) => item.uid}
          renderItem={({ item }) => (
            <UserListItem user={item} onToggle={toggleUserDetails} />
          )}
        />
        <View style={styles.buttonContainer}>
          <Button
            style={{ width: '35%' }}
            onPress={saveHandler}
            color={globalStyles.colors.teal}
          >
            Save
          </Button>
          <Button style={{ width: '35%' }} onPress={onCancel} color="salmon">
            Cancel
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default SettingsModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalStyles.colors.subtleTeal2,
    paddingVertical: 60,
  },
  title: {
    fontSize: 24,
    fontFamily: globalStyles.fontFamily.secondary,
    color: globalStyles.colors.darkTeal,
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  header: {
    padding: 10,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontFamily: globalStyles.fontFamily.primary,
    color: globalStyles.colors.darkTeal,
  },
});
