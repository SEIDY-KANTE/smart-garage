import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import useCustomFont from './src/hooks/useCustomFont';
import AppStack from './src/navigation/AppStack';
import AuthContextProvider from './src/context/auth-context';
import HomeStack from './src/navigation/HomeStack';
import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import ThemeContextProvider from './src/context/theme-context';

LogBox.ignoreLogs([
  'Warning: Async Storage has been extracted from react-native core',
]);

const App = () => {
  const [fontsLoaded] = useCustomFont();

  if (!fontsLoaded) return <AppLoading />;

  return (
    <AuthContextProvider>
      <ThemeContextProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          {/* <AppStack /> */}
          <HomeStack />
        </NavigationContainer>
      </ThemeContextProvider>
    </AuthContextProvider>
  );
};

export default App;
