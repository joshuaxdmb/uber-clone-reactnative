import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { selectOrigin, setDestination, setOrigin } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';

const data = [
  {
    id: '123',
    icon: 'home',
    location: 'Home',
    destination: '{"location":{"lat":43.6554252,"lng":-79.4180037},"description":"700 College Street, Toronto, ON, Canada"}',
  },
  {
    id: '456',
    icon: 'briefcase',
    location: 'Work',
    destination: '{"location":{"lat":43.6458008,"lng":-79.38311589999999},"description":"1 University Avenue, Toronto, ON, Canada"}',
  },
];

type Props = {
  function:string;
}

const NavFavourites = (props:Props) => {
  const dispatch = useDispatch()
  const navigation = useNavigation<any>()
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={()=>(
        <View style={[tw`bg-gray-200`,{height:0.5}]}/>
      )}
      renderItem={({ item }) => (
        <TouchableOpacity style={tw`flex-row items-center p-5`}
        onPress={()=>{
          if(props.function==='setOrigin'){
            dispatch(setOrigin(JSON.parse(item.destination)))
            navigation.navigate('MapScreen')
            }
          
          if(props.function==='setDestination'){
            dispatch(setDestination(JSON.parse(item.destination)))
          }
        }}
          >
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={item.icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{item.location}</Text>
            <Text style={tw`text-gray-500`}>{JSON.parse(item.destination).description}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default NavFavourites;
