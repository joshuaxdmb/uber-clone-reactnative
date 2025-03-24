import React from 'react';
import { View, StyleSheet, SafeAreaView, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { G_API_KEY } from '@env';
import { useDispatch } from 'react-redux';
import { setOrigin } from '../slices/navSlice';
import NavFavourites from '../components/NavFavourites';

const HomeScreen = () => {
    const dispatch = useDispatch();

  return (
    <SafeAreaView style={[tw`bg-white h-full`, styles.container]}>
      <View style={tw`p-5`}>
        <Image
          style={{ width: 100, height: 100, resizeMode: 'contain' }}
          source={{
            uri: 'https://links.papareact.com/gzs',
          }}
        />
        <GooglePlacesAutocomplete
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          placeholder="Where from?"
          styles={{
            container: { flex: 0 },
            textInput: {
              fontSize: 18,
            },
          }}
          fetchDetails={true}
          enablePoweredByContainer={false}
          minLength={2}
          query={{
            key:G_API_KEY,
            language:'en',

          }}
          onPress={(data, details=null)=>{
            dispatch(setOrigin({
                location:details?.geometry.location,
                description:data.description
            }))
          }}
        />
        <NavOptions />
          <NavFavourites function={'setOrigin'}/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default HomeScreen;
