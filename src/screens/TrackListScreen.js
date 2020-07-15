import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

const styles = StyleSheet.create({ text: { fontSize: 20 } });

const TrackListScreen = ({ navigation }) => (
  <View>
    <Text style={styles.text}>TrackListScreen</Text>
    <Button
      title="Track detail"
      onPress={() => {
        navigation.navigate('TrackDetail');
      }}
    />
  </View>
);

export default TrackListScreen;
