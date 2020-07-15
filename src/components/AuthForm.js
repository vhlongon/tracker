import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import Wrapper from './Wrapper';

const styles = StyleSheet.create({
  title: {
    color: '#333',
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginHorizontal: 15,
  },
});

const AuthForm = ({ error, headerText, buttonText, onSubmit = () => {} }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOnSubmit = () => {
    onSubmit({ email, password });
  };
  return (
    <>
      <Wrapper>
        <Text style={styles.title} h3>
          {headerText}
        </Text>
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
      {error && <Text style={styles.errorMessage}>{error}</Text>}
      <Wrapper>
        <Button title={buttonText} onPress={handleOnSubmit} />
      </Wrapper>
    </>
  );
};

export default AuthForm;
