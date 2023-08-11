import React, { useState } from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';
import { SelectedPage } from '../types/types';
import { setRideOption } from '../slices/navSlice';
export interface RideOption {
  id: string;
  title: string;
  multiplier: number;
  image: string;
}

const data = [
  {
    id: 'Uber-X-123',
    title: 'Uber X',
    multiplier: 1,
    image: 'https://links.papareact.com/3pn',
  },
  {
    id: 'Uber-XL-456',
    title: 'Uber XL',
    multiplier: 1.2,
    image: 'https://links.papareact.com/5w8',
  },
  {
    id: 'Uber-LUX-789',
    title: 'Uber LUX',
    multiplier: 1.75,
    image: 'https://links.papareact.com/7pf',
  },
];

export const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation<any>();
  const [selected, setSelected] = useState<RideOption | null>(null);

  const dispatch = useDispatch()
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  const HandleChoose = () => {
    dispatch(setRideOption(selected?.title))
    navigation.navigate(SelectedPage.SummaryCard,{
      selectedMethod:selected,
    })
  };

  return (
    <SafeAreaView style={[tw`bg-white flex-grow`]}>
      <View>
        <TouchableOpacity
          style={tw`absolute top-0 left-5 p-3 z-10 rounded-full`}
          onPress={() => navigation.navigate('NavigateCard')}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-3 text-xl`}>
          Select a Ride - {travelTimeInformation?.distance.text}
        </Text>
      </View>
      <FlatList
        style={{ flexBasis: 270, flexGrow: 1 }}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row items-center justify-between px-10 ${
              item?.id === selected?.id ? 'bg-gray-200' : ''
            }`}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain',
              }}
              source={{ uri: item.image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{item.title}</Text>
              <Text>{travelTimeInformation?.duration.text} Travel Time</Text>
            </View>
            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat('en-us', {
                style: 'currency',
                currency: 'CAD',
              }).format(
                (travelTimeInformation?.duration.value *
                  SURGE_CHARGE_RATE *
                  item.multiplier) /
                  100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View>
        <TouchableOpacity
          onPress={HandleChoose}
          disabled={!selected}
          style={tw`bg-black py-3 m-3 ${!selected ? 'bg-gray-300' : ''}`}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default RideOptionsCard;
