/* eslint-disable no-underscore-dangle */
import React from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { ListItem } from 'react-native-elements';
import { useTrackContext, fetchTracks } from '../context/TrackContext';

const styles = StyleSheet.create({ error: { fontSize: 16, color: 'red' } });

const TrackListScreen = ({ navigation }) => {
  const [state, dispatch] = useTrackContext();
  const { error, tracks } = state;

  const handleOnFocus = () => {
    fetchTracks(dispatch);
  };

  return (
    <View>
      <NavigationEvents onWillFocus={handleOnFocus} />
      {error ? <Text style={styles.error}>Something went wrong: {error}</Text> : null}
      {tracks && (
        <FlatList
          data={tracks}
          keyExtractor={({ _id }) => _id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('TrackDetail', { id: item._id });
              }}
            >
              <ListItem chevron title={item.name} />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

TrackListScreen.navigationOptions = {
  title: 'Tracks',
};

export default TrackListScreen;
