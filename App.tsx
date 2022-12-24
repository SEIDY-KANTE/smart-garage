import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import useCustomFont from './src/hooks/useCustomFont';
import AppStack from './src/navigation/AppStack';
import AuthContextProvider from './src/context/auth-context';
import { StatusBar } from 'expo-status-bar';
import ThemeContextProvider from './src/context/theme-context';

const App = () => {
  const [fontsLoaded] = useCustomFont();

  if (!fontsLoaded) return <AppLoading />;

  return (
    <AuthContextProvider>
      <ThemeContextProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <AppStack />
        </NavigationContainer>
      </ThemeContextProvider>
    </AuthContextProvider>
  );
};

export default App;
