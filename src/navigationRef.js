import { NavigationActions } from 'react-navigation';

// this is a way to extract react-navigation internal API so we can use
// outside the react components directly rendered by the createNavigation function
// like action creators, etc
// a bit of a hack since we are relying on mutating this local variable
let navigator;

export const setNavigator = nav => {
  navigator = nav;
};

export const navigate = (routeName, params) => {
  navigator.dispatch(NavigationActions.navigate({ routeName, params }));
};
