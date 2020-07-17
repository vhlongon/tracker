import React, { useCallback } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
// import '../mock/mockLocation';
import Map from '../components/Map';
import { useLocationContext, addCurrentLocation } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';

const styles = StyleSheet.create({
  text: { color: '#333', textAlign: 'center', marginVertical: 10 },
});

const TrackCreateScreen = ({ isFocused }) => {
  const [state, dispatch] = useLocationContext();
  const { currentLocation, recording, locations } = state;
  const coords = currentLocation ? currentLocation.coords : null;
  const setLocation = useCallback(
    location => {
      addCurrentLocation(dispatch, location);
    },
    [dispatch],
  );
  const { error } = useLocation(isFocused || recording, setLocation);

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text h3 style={styles.text}>
        Create Track
      </Text>
      {coords ? (
        <Map coords={coords} locations={locations} />
      ) : (
        <ActivityIndicator size="large" style={{ marginTop: 200 }} />
      )}
      {error && <Text>Please enable location services</Text>}
      <TrackForm />
    </SafeAreaView>
  );
};

export default withNavigationFocus(TrackCreateScreen);
