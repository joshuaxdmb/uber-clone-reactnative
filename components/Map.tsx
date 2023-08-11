import React, { useRef, useEffect, ReactNode } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import {
  RootState,
  selectDestination,
  setTravelInformation,
} from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { G_API_KEY } from '@env';
import axios from 'axios';
import { carsAround } from '../assets/data';
import carMarker from '../assets/carMarker.png';
import { selectRideOption } from '../slices/navSlice';
import { setOrigin } from '../slices/navSlice';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLocationDot, faLocationPin } from '@fortawesome/free-solid-svg-icons';
import tw from 'tailwind-react-native-classnames';

const Map = () => {
  const dispatch = useDispatch();
  const origin = useSelector((state: RootState) => state.nav.origin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef<MapView>(null);
  const rideOption = useSelector(selectRideOption);

  const setNewOriginHandler = (coord: {
    latitude: number;
    longitude: number;
  }) => {
    dispatch(
      setOrigin({
        location: {
          lat: coord.latitude,
          lng: coord.longitude,
        },
        description: 'Dropped Pin',
      })
    );
  };
  useEffect(() => {
    if (!origin || !destination) return;
    if (!rideOption) {
      mapRef.current?.fitToSuppliedMarkers(['origin', 'destination']);
    } else {
      mapRef.current?.fitToSuppliedMarkers(['origin', 'origin']);
    }
  }, [origin, destination, rideOption]);

  useEffect(() => {
    if (!origin || !destination) return;
    const getTravelTime = async () => {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.location.lat}%2C${origin.location.lng}&destinations=${destination.location.lat}%2C${destination.location.lng}&key=${G_API_KEY}`
        )
        .then((res) => {
          dispatch(setTravelInformation(res.data.rows[0].elements[0]));
        })
        .catch((err) => {
          console.log('DISTANCE API ERROR', err);
        });
    };

    getTravelTime();
  }, [origin, destination, G_API_KEY]);
  return (
    <View>
      <MapView
        scrollEnabled={rideOption ? false : true}
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: origin.location.lat,
          longitude: origin.location.lng,
          latitudeDelta: 0.025,
          longitudeDelta: 0.01,
        }}
      >
        {origin?.location &&
          carsAround.map((c, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: c.latitude,
                longitude: c.longitude,
              }}
            >
              <Image
                source={carMarker}
                style={{
                  width: 40,
                  resizeMode: 'contain',
                  transform: [{ rotate: c.rotation }],
                }}
              />
            </Marker>
          ))}
        {origin && destination && (
          <MapViewDirections
            origin={{latitude:origin.location.lat,longitude:origin.location.lng}}
            destination={{latitude:destination.location.lat,longitude:destination.location.lng}}
            apikey={G_API_KEY}
            strokeWidth={3}
            strokeColor="black"
          />
        )}
        {origin?.location && (
          <Marker
            draggable={rideOption ? true : false}
            onDragEnd={(e) => {
              setNewOriginHandler(e.nativeEvent.coordinate);
            }}
            coordinate={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,
            }}
            title="Origin"
            identifier="origin"
            description={origin.description}
          >
            <FontAwesomeIcon  size={40} icon={faLocationDot}/>
          </Marker>
        )}
        {origin && destination && (
          <Marker
            coordinate={{
              latitude: destination.location.lat,
              longitude: destination.location.lng,
            }}
            title="Destination"
            identifier="destination"
            description={destination.description}
            pinColor="black"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Map;
