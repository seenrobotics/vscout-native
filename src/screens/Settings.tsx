import React from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {Block, Text, Header} from '../components';
import * as theme from '../constants/theme';
import * as mocks from '../mocks';
import {NavigationTabProp} from 'react-navigation-tabs';

import {connect} from 'react-redux'; 

interface OwnProps {
    type: string;
    user: any;
    navigation:NavigationTabProp;
  }

type Props = OwnProps;

export default class Settings extends React.Component<Props, {}> {
    public static defaultProps = {
        user: mocks.user,
      };
    

    render() {
        return (
          <SafeAreaView style={styles.safe}>
            <Header pageName="Settings"></Header>
          </SafeAreaView>
        );
      }
}

const styles = StyleSheet.create({
    safe: {flex: 1, backgroundColor: theme.colors.primary},
    headerChart: {paddingTop: 30, paddingBottom: 30, zIndex: 1},
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    marginRight: 5,
  },
});
  