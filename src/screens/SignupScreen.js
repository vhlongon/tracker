import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

const styles = StyleSheet.create({ text: { fontSize: 20 } });

const SignupScreen = ({ navigation }) => (
  <View>
    <Text style={styles.text}>SignupScreen</Text>
    <Button
      title="Signin"
      onPress={() => {
        navigation.navigate('Signin');
      }}
    />
    <Button
      title="Main flow"
      onPress={() => {
        navigation.navigate('mainFlow');
      }}
    />
  </View>
);

export default SignupScreen;
