import * as shape from 'd3-shape';
import React from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {Block, Text, Header} from '../components';
import * as theme from '../constants/theme';
import * as mocks from '../mocks';
import {NavigationTabProp} from 'react-navigation-tabs';

import {connect} from 'react-redux'; 
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';


interface OwnProps {
    type: string;
    user: any;
    navigation:NavigationTabProp;
  }

type Props = OwnProps;

export default class Settings extends React.Component<Props, {}> {
    public static defaultProps = {
        user: mocks.user,
        chart: mocks.chart,
      };
    

      renderBody() {
        return (
          <Block flex={0.8} style={{backgroundColor:theme.colors.gray2,marginTop:-60,}}>
            <Block card shadow style={{backgroundColor:"white", marginHorizontal:25, paddingTop:30, paddingLeft:20, paddingBottom:0, marginTop:100, marginBottom:50,}}>
            <Block row><Feather name="moon" size={25} color={theme.colors.secondary}/><Text h4 style={{color:theme.colors.secondary, fontSize:20,paddingLeft:10,}}> Dark Theme</Text></Block>
            <Block row><MaterialIcons name="notifications-none" size={25} color={theme.colors.secondary}/><Text h4 style={{color:theme.colors.secondary, fontSize:20,paddingLeft:10,}}> Notifications</Text></Block>
            <Block row><Fontisto name="export" size={20} color={theme.colors.secondary} style={{paddingLeft:5}}/><Text h4 style={{color:theme.colors.secondary, fontSize:20,paddingLeft:10,}}> Export Scouting Reports</Text></Block>
            <Block row><SimpleLineIcons name="organization" size={25} color={theme.colors.secondary} style={{paddingLeft:3}}/><Text h4 style={{color:theme.colors.secondary, fontSize:20,paddingLeft:10,}}> Manage Organisation</Text></Block>
            <Block row><Text h4 style={{color:theme.colors.primary, fontSize:20,}}> Go Offline</Text></Block>
            <Block row><Text h4 style={{color:theme.colors.primary, fontSize:20,}}> Sign Out</Text></Block>
            </Block>
          </Block>
        )
      }

    
    render() {
        return (
          <SafeAreaView style={styles.safe}>
                <Header pageName="Settings"></Header>
                {this.renderBody()}
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
  },
});
  