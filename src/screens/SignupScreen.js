import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { useAuth, signup, CLEAR_ERROR } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 150,
  },
});

const SignupScreen = () => {
  const [state, dispatch] = useAuth();
  const clearError = () => {
    dispatch({ type: CLEAR_ERROR });
  };
  // this is another approach with a custom hook and passing down navigation from props:
  // useWillFocus(navigation, clearError);
  // but since we already have a component, NavigationEvents we might as well use it instead
  const handleSignup = ({ email, password }) => {
    signup(dispatch, { email, password });
  };

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearError} />
      <AuthForm
        onSubmit={handleSignup}
        headerText="Sign up for tracker"
        buttonText="Sign Up"
        error={state.error}
      />
      <NavLink text="Already have an account? Sign in instead" to="Signin" />
    </View>
  );
};

// remove the default header
SignupScreen.navigationOptions = {
  header: () => false,
};

export default SignupScreen;
