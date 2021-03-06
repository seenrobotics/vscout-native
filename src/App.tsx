/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';

import {Provider} from 'react-redux';
import {store} from './store';

import AppNavigator from './navigation/AppNavigator';

const App: () => React$Node = () => {
  return (
    <>
      <Provider store={store}>
        <View style={styles.container}>
          <AppNavigator />
        </View>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
