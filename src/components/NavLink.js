import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import Wrapper from './Wrapper';

const styles = StyleSheet.create({
  link: {
    color: '#2089dc',
    textAlign: 'center',
  },
});

const NavLink = ({ navigation, text, to }) => (
  <Wrapper>
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(to);
      }}
    >
      <Text style={styles.link}>{text}</Text>
    </TouchableOpacity>
  </Wrapper>
);

export default withNavigation(NavLink);
