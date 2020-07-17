import React from 'react';
import { Input, Button } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import {
  useLocationContext,
  startRecording,
  stopRecording,
  changeName,
} from '../context/LocationContext';

const styles = StyleSheet.create({ container: { padding: 15 } });

const TrackForm = () => {
  const [state, dispatch] = useLocationContext();

  const { name, recording } = state;
  const handleChange = text => {
    changeName(dispatch, text);
  };

  const handlePress = () => {
    if (recording) {
      stopRecording(dispatch);
    } else {
      startRecording(dispatch);
    }
  };

  return (
    <View style={styles.container}>
      <Input placeholder="Enter name" value={name} onChangeText={handleChange} />
      <Button title={recording ? 'Stop recording' : 'Start recording'} onPress={handlePress} />
    </View>
  );
};

export default TrackForm;
