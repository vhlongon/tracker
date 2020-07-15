import createDataContext from './createDataContext';

const SIGN_UP = 'SIGN_UP';
const authReducer = (state, { type, payload }) => {
  switch (type) {
    case SIGN_UP: {
      const { error, token } = payload;
      return {
        ...state,
        isSignedIn: !error,
        token,
        error: error ? 'Something went wrong with sign up' : null,
      };
    }
    default: {
      return state;
    }
  }
};

const initialState = { isSignedIn: false };

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
    dispatch({ type: SIGN_UP, payload: data });
  } catch (error) {
    dispatch({ type: SIGN_UP, payload: { error: error.message } });
  }
};

export const signin = (dispatch, { email, password }) => {
  console.log({ dispatch, email, password });
};

export const signout = dispatch => {
  console.log(dispatch);
};

const { Provider, useState, useDispatch } = createDataContext(authReducer, initialState);
const useAuth = () => [useState(), useDispatch()];

export { Provider, useAuth };
