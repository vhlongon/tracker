import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAuth, signup, RESET } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import useDidFocus from '../hooks/useDidFocus';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 150,
  },
});

const SignupScreen = ({ navigation }) => {
  const [state, dispatch] = useAuth();
  const reset = () => {
    dispatch({ type: RESET });
  };
  useDidFocus(navigation, reset);

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
