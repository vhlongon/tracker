import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Circle, Polyline } from 'react-native-maps';

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});

const Map = ({ coords = {}, locations }) => (
  <View>
    <MapView
      style={styles.map}
      initialRegion={{
        ...coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      // this one changes the centering of the map according to new coords received:
      // region={{ ...coords, latitudeDelta: 0.01, longitudeDelta: 0.01 }}
    >
      <Circle
        // while Circle draws a circle chaing its position to every new coords but does not change the centering of the map itself
        center={coords}
        radius={30}
        strokeColor="rgba(158, 158, 255, 1.0)"
        fillColor="rgba(158, 158, 255, 0.3)"
      />
      <Polyline coordinates={locations.map(location => location.coords)} />
    </MapView>
  </View>
);
export default Map;
