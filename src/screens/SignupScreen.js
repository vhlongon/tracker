import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Wrapper from '../components/Wrapper';
import { useAuth, signup } from '../context/AuthProvider';

const styles = StyleSheet.create({
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
});

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, dispatch] = useAuth();

  const handleSubmit = () => {
    signup(dispatch, { email, password });
  };

  return (
    <View style={styles.container}>
      <Wrapper>
        <Text h3>Sign Up for tracker</Text>
      </Wrapper>
      <Wrapper>
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </Wrapper>
      <Wrapper>
        <Input
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </Wrapper>
      {state.error && <Text style={styles.errorMessage}>{state.error}</Text>}
      <Wrapper>
        <Button title="Sign up" onPress={handleSubmit} />
      </Wrapper>
    </View>
  );
};

// remove the default header
SignupScreen.navigationOptions = {
  header: () => false,
};

export default SignupScreen;
