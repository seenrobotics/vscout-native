import React from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {Block, Text} from '../components';
import * as theme from '../constants/theme';
import * as mocks from '../mocks';
import {NavigationTabProp} from 'react-navigation-tabs';
import Header from '../components/Header'
import {connect} from 'react-redux'; 

interface OwnProps {
  linkedDocIDs : string[];
  navigation: NavigationTabProp;
  pageName : string;
}

type Props = OwnProps;

export default class Summary extends React.Component<Props> {
    public static defaultProps = {
        pageName : "Summary"
    };

    renderHeader() {
      return (
        <Header pageName="Add Scouting"></Header>
      );
    }
    render() {
        return (
          <SafeAreaView style={styles.safe}>
                {this.renderHeader()}
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
  