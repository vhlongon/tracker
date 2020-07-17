/* eslint-disable no-underscore-dangle */
import React from 'react';
import MapView, { Polyline } from 'react-native-maps';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { useTrackContext } from '../context/TrackContext';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  text: { fontSize: 20, textAlign: 'center', marginBottom: 20 },
  map: {
    height: 300,
  },
});

const TrackDetailScreen = ({ navigation }) => {
  const [state] = useTrackContext();
  const { tracks } = state;
  const id = navigation.getParam('id');

  const currentTrack = tracks.find(track => track._id === id);
  const { coords } = currentTrack.locations[0];
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>{currentTrack.name}</Text>
      <MapView
        style={styles.map}
        initialRegion={{ ...coords, latitudeDelta: 0.01, longitudeDelta: 0.01 }}
      >
        <Polyline coordinates={currentTrack.locations.map(location => location.coords)} />
      </MapView>
    </ScrollView>
  );
};

export default TrackDetailScreen;
