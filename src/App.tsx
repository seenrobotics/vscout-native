/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Platform, StatusBar, StyleSheet, Text, View, SafeAreaView} from 'react-native';

import {Provider} from 'react-redux';
import {store} from './store';

import AppStack from './navigation/AppStack';
import { NavigationContainer } from '@react-navigation/native';

const App: () => React.ReactNode = () => {
  return (
    <>
      <Provider store={store}>
        <SafeAreaView style={{flex:1}}>
          <View style={styles.container}><AppStack/>
          </View>
        </SafeAreaView>
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
