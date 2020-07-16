import createDataContext from './createDataContext';

const ADD_CURRENT_LOCATION = 'ADD_CURRENT_LOCATION';
const initialState = { recording: false, lolcations: [], currentLocation: null };
const locationReducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_CURRENT_LOCATION: {
      return { ...state, currentLocation: payload };
    }
    default: {
      return state;
    }
  }
};

export const startRecording = dispatch => {
  console.log(dispatch);
};

export const stopRecording = dispatch => {
  console.log(dispatch);
};

export const addCurrentLocation = (dispatch, location) => {
  console.log('addCurrentLocation');
  dispatch({ type: ADD_CURRENT_LOCATION, payload: location });
};

const { Provider, useContextState, useContextDispatch } = createDataContext(
  locationReducer,
  initialState,
);
const useLocationContext = () => [useContextState(), useContextDispatch()];

export { Provider, useLocationContext };
