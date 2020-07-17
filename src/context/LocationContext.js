import createDataContext from './createDataContext';

const ADD_CURRENT_LOCATION = 'ADD_CURRENT_LOCATION';
const START_RECORDING = 'START_RECORDING';
const STOP_RECORDING = 'STOP_RECORDING';
const CHANGE_NAME = 'CHANGE_NAME';

const initialState = { recording: false, locations: [], currentLocation: null, name: '' };
const locationReducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_CURRENT_LOCATION: {
      const { recording, locations } = state;
      return {
        ...state,
        currentLocation: payload,
        locations: recording ? [...locations, payload] : locations,
      };
    }
    case START_RECORDING: {
      return { ...state, recording: true };
    }
    case STOP_RECORDING: {
      return { ...state, recording: false };
    }
    case CHANGE_NAME: {
      return { ...state, name: payload };
    }
    default: {
      return state;
    }
  }
};

export const changeName = (dispatch, name) => {
  dispatch({ type: CHANGE_NAME, payload: name });
};

export const startRecording = dispatch => {
  dispatch({ type: START_RECORDING });
};

export const stopRecording = dispatch => {
  dispatch({ type: STOP_RECORDING });
};

export const addCurrentLocation = (dispatch, location) => {
  dispatch({ type: ADD_CURRENT_LOCATION, payload: location });
};

const { Provider, useContextState, useContextDispatch } = createDataContext(
  locationReducer,
  initialState,
);
const useLocationContext = () => [useContextState(), useContextDispatch()];

export { Provider, useLocationContext };
