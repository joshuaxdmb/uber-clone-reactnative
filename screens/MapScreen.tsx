import React from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Map from '../components/Map';
import { createStackNavigator } from '@react-navigation/stack';
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import SummaryCard from '../components/SummaryCard';
import { SelectedPage } from '../types/types';

type StackParams = {
  NavigateCard: undefined;
  RideOptionsCard: undefined;
  SummaryCard:{
    selectedMethod:string
  }
} ;



const MapScreen = () => {
 
    const Stack = createStackNavigator<StackParams>()
    const navigation = useNavigation<any>();
  return (
    <View>
    <TouchableOpacity 
    onPress={()=>{navigation.navigate('HomeScreen')}} style={tw`absolute top-16 left-8 bg-gray-100 z-10 p-3 rounded-full shadow-lg`}>
      <Icon name="menu"/> 
    </TouchableOpacity>
      <View style={tw`h-1/2`}>
        <Map />
      </View>
      <SafeAreaView style={tw`h-1/2 flex bg-white`}>
        <Stack.Navigator>
            <Stack.Screen
                name='NavigateCard'
                component={NavigateCard}
                options={{
                    headerShown:false
                }}
                
            />
            <Stack.Screen
                name='RideOptionsCard'
                component={RideOptionsCard}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen
                name={SelectedPage.SummaryCard}
                component={SummaryCard}
                options={{
                    headerShown:false
                }}
            />
        </Stack.Navigator>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default MapScreen;
