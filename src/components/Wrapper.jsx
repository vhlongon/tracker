import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({ wrapper: { margin: 10 } });

const Wrapper = ({ children }) => <View style={styles.wrapper}>{children}</View>;

export default Wrapper;
