import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Button from '../../UI/Button';
import { useAuth } from '../../../context/auth-context';
import globalStyles from '../../../common';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/theme-context';
import UserAvatar from './UserAvatar';

const ProfileTab = () => {
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <UserAvatar username={currentUser?.username} />
      </View>
      <View style={styles.flexContainer}>
        <Text style={styles.text}>Username:</Text>
        <Text style={styles.text}>{currentUser?.username}</Text>
      </View>
      <View style={styles.flexContainer}>
        <Text style={styles.text}>Status:</Text>
        <Text style={styles.text}>
          {currentUser?.isAdmin ? '👤 Admin' : '✅ Authorized'}
        </Text>
      </View>
      <View style={styles.flexContainer}>
        <Text style={styles.text}>Email Address:</Text>
        <Text style={styles.text}>{currentUser?.email}</Text>
      </View>
      <View style={styles.flexContainer}>
        <Text style={styles.text}>Theme: </Text>
        <View style={styles.themeButton}>
          <Button onPress={toggleTheme}>
            <Ionicons
              name={theme === 'dark' ? 'moon' : 'sunny'}
              size={24}
              color={globalStyles.colors.teal}
            ></Ionicons>
          </Button>
        </View>
      </View>
      <Button
        onPress={logout}
        color={globalStyles.colors.accent}
        style={styles.button}
      >
        Logout
      </Button>
    </View>
  );
};

export default ProfileTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  themeButton: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatarContainer: {
    marginBottom: 40,
  },
  button: {
    marginTop: 20,
  },
});
