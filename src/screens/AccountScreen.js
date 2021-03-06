import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Button, Text } from 'react-native-elements';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FontAwesome } from '@expo/vector-icons';
import { useAuthContext, signout } from '../context/AuthContext';
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
    marginVertical: 10,
  },
});

// SafeAreaView docs: https://reactnavigation.org/docs/4.x/handling-iphonex
// basically we can render stuff within the safe area in the device, respecting bottom and top bars
// in the devices itself
const AccountScreen = () => {
  const [, dispatch] = useAuthContext();

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

AccountScreen.navigationOptions = {
  title: 'Account',
  tabBarIcon: <FontAwesome name="gear" size={20} color="#333" />,
};

export default AccountScreen;
