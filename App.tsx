import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  ImageBackground,
  SafeAreaView,
  Text,
  TextInput,
} from 'react-native';
import globalStyles from './src/common';
import useCustomFont from './src/hooks/useCustomFont';
import AuthStack from './src/navigation/AuthStack';
import AuthContextProvider from './src/store/auth-context';

const App = () => {
  const [fontsLoaded] = useCustomFont();

  if (!fontsLoaded) return <AppLoading />;

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
          <AuthContextProvider>
            <NavigationContainer>
              <AuthStack />
            </NavigationContainer>
          </AuthContextProvider>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

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

export default App;
