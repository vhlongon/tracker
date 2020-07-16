import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Button, Text } from 'react-native-elements';
import { useAuth, signout } from '../context/AuthContext';
import Wrapper from '../components/Wrapper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 150,
  },
  title: {
    color: '#333',
    textAlign: 'center',
  },
});

// SafeAreaView docs: https://reactnavigation.org/docs/4.x/handling-iphonex
// basically we can render stuff within the safe area in the device, respecting bottom and top bars
// in the devices itself
const AccountScreen = () => {
  const [, dispatch] = useAuth();

  const handleSignout = () => {
    signout(dispatch);
  };

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text style={styles.title} h3>
        Account Screen
      </Text>
      <Wrapper>
        <Button title="Sign out" onPress={handleSignout} />
      </Wrapper>
    </SafeAreaView>
  );
};

export default AccountScreen;
