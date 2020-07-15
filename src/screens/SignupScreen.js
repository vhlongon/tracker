import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAuth, signup } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const styles = StyleSheet.create({
  title: {
    color: '#333',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 150,
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginHorizontal: 15,
  },
  link: {
    color: '#2089dc',
    textAlign: 'center',
  },
});

const SignupScreen = () => {
  const [state, dispatch] = useAuth();

  const handleSignup = ({ email, password }) => {
    signup(dispatch, { email, password });
  };

  return (
    <View style={styles.container}>
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
