import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { useAuth, signin, CLEAR_ERROR } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 150,
  },
});

const SiginScreen = () => {
  const [state, dispatch] = useAuth();
  const clearError = () => {
    dispatch({ type: CLEAR_ERROR });
  };
  // useWillFocus(navigation, clearError);
  const handleSignin = ({ email, password }) => {
    signin(dispatch, { email, password });
  };

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearError} />
      <AuthForm
        onSubmit={handleSignin}
        headerText="Sign in for tracker"
        buttonText="Sign in"
        error={state.error}
      />
      <NavLink text="Don't have an account yet? Sign up instead" to="Signup" />
    </View>
  );
};

// remove the default header
SiginScreen.navigationOptions = {
  header: () => false,
};

export default SiginScreen;
