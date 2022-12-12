import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import { useAuth } from '../context/auth-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import globalStyles from '../common';
import HomeStack from './HomeStack';
import AuthStack from './AuthStack';

const AppStack = () => {
  const { isLoggedIn } = useAuth();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={[globalStyles.colors.cyan, globalStyles.colors.green]}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.rootScreen}
      >
        <SafeAreaView style={styles.rootScreen}>
          {/* <ImageBackground
            source={require('./assets/images/main-bg2.jpg')}
            resizeMode="cover"
            style={styles.rootScreen}
            imageStyle={styles.backgroundImage}
          ></ImageBackground> */}
          {isLoggedIn ? <HomeStack /> : <AuthStack />}
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default AppStack;

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    opacity: 0.5,
  },
  test: {
    flex: 1,
    width: '100%',
    color: globalStyles.colors.black,
    fontSize: 20,
    fontFamily: 'Ubuntu_400Regular',
  },
});
