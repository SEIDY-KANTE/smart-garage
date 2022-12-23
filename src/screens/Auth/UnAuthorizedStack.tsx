import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Button from '../../components/UI/Button';
import { useAuth } from '../../context/auth-context';
import globalStyles from '../../common';

const UnAuthorizedStack = () => {
  const { logout, currentUser } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.primaryText}>Welcome {currentUser?.username}!</Text>
      <Text style={styles.text}>You are not authorized to access this part of the app just yet</Text>
      <Text style={styles.text}>Please contact the admin</Text>
      <Button onPress={logout} style={styles.button}>
        Logout
      </Button>
    </View>
  );
};

export default UnAuthorizedStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalStyles.colors.teal,
  },
  button: {
    marginTop: 20,
    width: 250,
    backgroundColor: globalStyles.colors.accent,
  },
  primaryText: {
    fontSize: 25,
    fontFamily: globalStyles.fontFamily.primary,
    color: globalStyles.colors.white,
    marginBottom: 15,
  },
  text: {
    fontFamily: globalStyles.fontFamily.primary,
    color: globalStyles.colors.white,
    fontSize: 13,
  },
});
