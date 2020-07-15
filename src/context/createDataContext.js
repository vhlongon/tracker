import React, { createContext, useReducer } from 'react';

const createDataContext = (reducer, initialState) => {
  const StateContext = createContext();
  const DispatchContext = createContext();

  const useState = () => {
    const context = React.useContext(StateContext);
    if (context === undefined) {
      throw new Error('useContextState must be used within a Provider');
    }
    return context;
  };

  const useDispatch = () => {
    const context = React.useContext(DispatchContext);
    if (context === undefined) {
      throw new Error('useDispatchContext must be used within a Provider');
    }
    return context;
  };

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
      </StateContext.Provider>
    );
  };

  return { Provider, useState, useDispatch };
};

export default createDataContext;
