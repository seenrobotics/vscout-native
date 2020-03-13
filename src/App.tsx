/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';

import AppNavigator from './navigation/AppNavigator';

const App: () => React$Node = () => {
  return (<><View style = {styles.container}><AppNavigator /></View></>);
};

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : '#fff',
  }
});

export default App;
