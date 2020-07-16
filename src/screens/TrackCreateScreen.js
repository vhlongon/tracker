import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';
// import '../mock/mockLocation';
import Map from '../components/Map';
import { useLocationContext, addCurrentLocation } from '../context/LocationContext';

const styles = StyleSheet.create({ text: { color: '#333' } });

const TrackCreateScreen = () => {
  const [state, dispatch] = useLocationContext();
  const [error, setError] = useState();

  const coords = state.currentLocation ? state.currentLocation.coords : null;

  const watchLocation = async () => {
    try {
      const { granted } = await requestPermissionsAsync();

      if (!granted) {
        throw new Error('Location permission not granted');
      }

      await watchPositionAsync(
        {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000, // get an updated location every second
          distanceInterval: 10, // or every 10 meters
        },
        location => {
          addCurrentLocation(dispatch, location);
        },
      );
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    watchLocation();
  }, []);

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text h3 style={styles.text}>
        Create Track
      </Text>
      {coords ? (
        <Map coords={coords} />
      ) : (
        <ActivityIndicator size="large" style={{ marginTop: 200 }} />
      )}
      {error && <Text>Please enable location services</Text>}
    </SafeAreaView>
  );
};

export default TrackCreateScreen;
