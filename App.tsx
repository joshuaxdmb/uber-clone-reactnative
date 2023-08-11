import { StatusBar } from 'expo-status-bar';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import { Store } from './Store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from './screens/MapScreen';
import EatScreen from './screens/EatScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SelectedPage } from './types/types';
import PaymentScreen from './screens/PaymentScreen';



type StackParams = {
  HomeScreen: undefined;
  MapScreen: undefined;
  EatScreen: undefined;
  PaymentScreen:undefined
} ;

export default function App() {
  const Stack = createStackNavigator<StackParams>();
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <SafeAreaProvider>
        <KeyboardAvoidingView style={{flex:1}}
        behavior={Platform.OS==='ios'?'padding':'height'}
        keyboardVerticalOffset={Platform.OS==='ios'?-64:0}>
          <Stack.Navigator>
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="MapScreen"
              component={MapScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="EatScreen"
              component={EatScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={SelectedPage.PaymentScreen}
              component={PaymentScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
