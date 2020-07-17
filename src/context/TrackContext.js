import fetchIntercept from 'fetch-intercept';
import { AsyncStorage } from 'react-native';
import { BASE_URL } from '../api';
import createDataContext from './createDataContext';

const initialState = { tracks: [], error: null };
const FETCH_TRACKS = 'FETCH_TRACKS';
const ADD_ERROR = 'ADD_ERROR';

const trackerReducer = (state, { type, payload }) => {
  switch (type) {
    case FETCH_TRACKS: {
      return { tracks: payload, error: null };
    }
    case ADD_ERROR: {
      return { ...state, error: payload };
    }
    default:
      return state;
  }
};

export const fetchTracks = async dispatch => {
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
    const response = await fetch(`${BASE_URL}/tracks`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    dispatch({ type: FETCH_TRACKS, payload: data });
  } catch (error) {
    console.log('error fetching tracks: ', error);
    dispatch({ type: FETCH_TRACKS, payload: error.message });
  }

  unregister();
};

export const createTrack = async ({ locations, name }) => {
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
