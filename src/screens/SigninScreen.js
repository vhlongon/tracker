import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAuth, signin, RESET } from '../context/AuthContext';
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

const SiginScreen = ({ navigation }) => {
  const [state, dispatch] = useAuth();
  const reset = () => {
    dispatch({ type: RESET });
  };

  useDidFocus(navigation, reset);

  const handleSignin = ({ email, password }) => {
    signin(dispatch, { email, password });
  };

  return (
    <View style={styles.container}>
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
