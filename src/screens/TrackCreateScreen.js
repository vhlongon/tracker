import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
// import '../mock/mockLocation';
import Map from '../components/Map';
import { useLocationContext, addCurrentLocation } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';

const styles = StyleSheet.create({ text: { color: '#333' } });

const TrackCreateScreen = () => {
  const [state, dispatch] = useLocationContext();
  const coords = state.currentLocation ? state.currentLocation.coords : null;
  const setLocation = location => {
    addCurrentLocation(dispatch, location);
  };
  const { error } = useLocation(setLocation);

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
