import React from 'react';
import { Input, Button } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import {
  useLocationContext,
  startRecording,
  stopRecording,
  changeName,
} from '../context/LocationContext';
import useSaveTrack from '../hooks/useSaveTrack';

const styles = StyleSheet.create({ container: { padding: 15 }, button: { marginTop: 15 } });

const TrackForm = () => {
  const [state, dispatch] = useLocationContext();
  const [saveTrack] = useSaveTrack();
  const { name, recording, locations } = state;
  const handleNameChange = text => {
    changeName(dispatch, text);
  };
  const handleRecord = () => {
    if (recording) {
      stopRecording(dispatch);
    } else {
      startRecording(dispatch);
    }
  };

  const showRecordingButton = !recording && locations.length;

  return (
    <View style={styles.container}>
      <Input placeholder="Enter name" value={name} onChangeText={handleNameChange} />
      <Button title={recording ? 'Stop recording' : 'Start recording'} onPress={handleRecord} />
      {showRecordingButton ? (
        <Button style={styles.button} title="Save recording" onPress={saveTrack} />
      ) : null}
    </View>
  );
};

export default TrackForm;
