import fetchIntercept from 'fetch-intercept';
import { AsyncStorage } from 'react-native';
import { BASE_URL } from '../api';
import createDataContext from './createDataContext';

const initialState = {};
const trackerReducer = (state, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};

export const fetchTracks = dispatch => {
  // return the recorded tracks
};

export const createTrack = async (dispatch, { locations, name }) => {
  const unregister = fetchIntercept.register({
    request: async (url, config) => {
      const token = await AsyncStorage.getItem('token');
      const newConfig = { ...config };

      if (token) {
        newConfig.headers.Authorization = `Bearer ${token}`;
      }

      return [url, newConfig];
    },
    requestError: error => Promise.reject(error),
  });

  try {
    await fetch(`${BASE_URL}/tracks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ locations, name: name.trim() }),
    });
  } catch (error) {
    console.log('error saving track: ', error);
  }

  unregister();
};

const { Provider, useContextState, useContextDispatch } = createDataContext(
  trackerReducer,
  initialState,
);
const useTrackContext = () => [useContextState(), useContextDispatch()];

export { Provider, useTrackContext };
