import { AsyncStorage } from 'react-native';
import { navigate } from '../navigationRef';
import createDataContext from './createDataContext';

const SIGN_UP = 'SIGN_UP';
const SIGN_IN = 'SIGN_IN';
const ADD_ERROR = 'ADD_ERROR';
const RESET = 'RESET';
const SIGN_OUT = 'SIGN_OUT';
export const CLEAR_ERROR = 'CLEAR_ERROR';

const initialState = { isSignedIn: false };

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case SIGN_UP:
    case SIGN_IN: {
      return {
        ...state,
        isSignedIn: true,
        token: payload,
      };
    }
    case ADD_ERROR: {
      return { ...state, error: payload, isSignedIn: false };
    }
    case RESET: {
      return initialState;
    }
    case CLEAR_ERROR: {
      return { ...state, error: null };
    }
    case SIGN_OUT: {
      return { ...state, token: null, error: null, isSignedIn: false };
    }
    default: {
      return state;
    }
  }
};

export const signup = async (dispatch, { email, password }) => {
  try {
    const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    const { token, error } = data;

    if (error) {
      dispatch({ type: ADD_ERROR, payload: 'Something went wrong with signup' });
      return;
    }

    await AsyncStorage.setItem('token', token);
    dispatch({ type: SIGN_UP, payload: token });
    navigate('TrackList');
  } catch (error) {
    dispatch({ type: SIGN_UP, payload: error.message });
  }
};

export const signin = async (dispatch, { email, password }) => {
  try {
    const response = await fetch('http://localhost:3000/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    const { token, error } = data;

    if (error) {
      dispatch({ type: ADD_ERROR, payload: 'Something went wrong with signin' });
      return;
    }

    await AsyncStorage.setItem('token', token);
    dispatch({ type: SIGN_IN, payload: token });
    navigate('TrackList');
  } catch (error) {
    dispatch({ type: SIGN_IN, payload: error.message });
  }
};

export const tryLocalSignin = async dispatch => {
  const token = await AsyncStorage.getItem('token');

  if (token) {
    dispatch({ type: SIGN_IN, payload: token });
    navigate('TrackList');
  } else {
    navigate('loginFlow');
  }
};

export const signout = async dispatch => {
  await AsyncStorage.removeItem('token');
  dispatch({ type: SIGN_OUT });
  navigate('loginFlow');
};

const { Provider, useContextState, useContextDispatch } = createDataContext(
  authReducer,
  initialState,
);
const useAuth = () => [useContextState(), useContextDispatch()];

export { Provider, useAuth };
