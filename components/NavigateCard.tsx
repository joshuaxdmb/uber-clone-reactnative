import React, { useEffect } from 'react'
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { G_API_KEY } from '@env'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectDestination,
  selectOrigin,
  setDestination,
} from '../slices/navSlice'
import { useNavigation } from '@react-navigation/native'
import NavFavourites from './NavFavourites'
import { Icon } from 'react-native-elements'

const NavigateCard = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<any>()
  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)
  useEffect(() => {
    if (origin && destination) {
      navigation.navigate('RideOptionsCard')
    }
  }, [origin, destination])
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Good Morning, Joshua</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <GooglePlacesAutocomplete
          placeholder='Whete to?'
          debounce={400}
          minLength={2}
          styles={styles}
          fetchDetails={true}
          enablePoweredByContainer={false}
          query={{
            key: G_API_KEY,
            language: 'en',
          }}
          onPress={(data, details = null) => {
            dispatch(
              setDestination({
                location: details?.geometry.location,
                description: data.description,
              })
            )
            navigation.navigate('RideOptionsCard')
          }}
        />
        <NavFavourites function='setDestination' />
      </View>
      <View
        style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}
      >
        <TouchableOpacity
          style={tw`justify-between flex flex-row bg-black w-24 px-4 rounded-full py-3`}
          onPress={() => navigation.navigate('NavigateCard')}
        >
          <Icon name='car' type='font-awesome' color='white' size={16} />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex flex-row  justify-between bg-white w-24 px-4 rounded-full py-3`}
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <Icon
            name='fast-food-outline'
            type='ionicon'
            color='black'
            size={16}
          />
          <Text style={tw` text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: '#DDDDDF',
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
})

export default NavigateCard
