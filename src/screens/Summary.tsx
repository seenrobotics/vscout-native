import * as shape from 'd3-shape';
import React from 'react';
import {Image, SafeAreaView, StyleSheet, View, Button} from 'react-native';
import {NavigationTabProp} from 'react-navigation-tabs';

import {Line} from 'react-native-svg';
import {LineChart, Path} from 'react-native-svg-charts';

import {Block, Text} from '../components';
import {CardList} from '../components/events';
import * as theme from '../constants/theme';
import * as mocks from '../mocks';
import {types, actions} from '../store';
import {connect} from 'react-redux'; 
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Tooltip} from 'react-native-elements';

const {addEvents, getEvents } = actions.events;
const { getUser, authUser } = actions.user;
interface OwnProps {
    type: string;
    user: any;
    navigation:NavigationTabProp;
  }

  type Props = OwnProps;

export default class Summary extends React.Component<Props, {}> {
    public static defaultProps = {
        user: mocks.user,
        chart: mocks.chart,
      };
    
      renderChart() {
        const {chart} = this.props;
        return (
          <LineChart
            yMin={0}
            yMax={10}
            data={chart}
            style={{flex: 2}}
            curve={shape.curveMonotoneX}
            svg={{
              stroke: theme.colors.primary,
              strokeWidth: 1.75,
            }}
            contentInset={{left: theme.sizes.base, right: theme.sizes.base}}>
            <Line
              key="zero-axis"
              x1="0%"
              x2="100%"
              y1="50%"
              y2="50%"
              stroke={theme.colors.gray}
              strokeDasharray={[2, 10]}
              strokeWidth={3}
            />
          </LineChart>
        );
      }
    
      renderBody(){
        return (
          <Block flex={0.5} style={{backgroundColor:theme.colors.gray2,marginTop:-60,}}>
            <Block style={{paddingTop:45}}>
            <TouchableOpacity activeOpacity={0.8} style={{marginTop:20,}}><Block flex={0.15} card shadow row style={{marginHorizontal:20, backgroundColor:theme.colors.accent, padding:25,alignItems:'center'}}><IoniconsIcon name="md-people" size={10} color={theme.colors.white} style={{transform: [{ scale: 3 }]}}/><Text h3 style={{color:theme.colors.white, paddingLeft:20,}}>View Teams</Text></Block></TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={{marginTop:20,}}><Block flex={0.15} card shadow row style={{marginHorizontal:20, backgroundColor:theme.colors.accent, padding:25,alignItems:'center'}}><FontAwesome5Icon name="binoculars" size={10} color={theme.colors.white} style={{transform: [{ scale: 2.5 }]}}/><Text h3 style={{color:theme.colors.white, paddingLeft:20,}}>View Events</Text></Block></TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={{marginTop:20,}}><Block flex={0.15} card shadow row style={{marginHorizontal:20, backgroundColor:theme.colors.accent, padding:25,alignItems:'center'}}><MaterialIcons name="note-add" size={10} color={theme.colors.white} style={{transform: [{ scale: 3 }]}}/><Text h3 style={{color:theme.colors.white, paddingLeft:20,}}>Create a Scouting Report</Text></Block></TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={{marginTop:20,}}><Block flex={0.15} card shadow row style={{marginHorizontal:20, backgroundColor:theme.colors.accent, padding:25,alignItems:'center'}}><IoniconsIcon name="md-settings" size={10} color={theme.colors.white} style={{transform: [{ scale: 3 }]}}/><Text h3 style={{color:theme.colors.white, paddingLeft:20,}}>Change Settings</Text></Block></TouchableOpacity>
            </Block>
          </Block>
        )
      }

      renderHeader() {
        const {user} = this.props;
        return (
          <Block flex={0.5} column style={{paddingHorizontal: 15}}>
              <Block flex={false} row style={{paddingVertical: 15}}>
              <Block center>
                <Text h3 white style={{fontSize:21, marginRight: -(100 + 10 + 30)}}>
                  VSCOUT
                </Text>
              </Block>
              <View style={{width:100, marginRight:10}}>
        <Text h4 white style={{fontSize:10, textAlign:'right'}}>{user?.userName}</Text>
                <Text h3 white style={{fontSize:15, textAlign:'right'}}>{user?.team}</Text>
              </View>
              <Image style={styles.avatar} source={user?.avatar} />
            </Block>

            <Block flex={0.4} card shadow row style={{backgroundColor:theme.colors.accent, padding:20,}}>
            <Block  flex={0.5} style={{justifyContent: 'center'}}>
            <Text h3 white style={{fontSize:15,}}>2381 Kernel Bye</Text>
            <Text h1 white style={{}}>2381Y</Text>
            </Block>
            <Block flex={0.5} >
              <Block row style={{paddingTop:30,}}>
              <Tooltip backgroundColor="white" overlayColor="rgba(0,0,0,0.15)" skipAndroidStatusBar={true} popover={<Text>Avg. Placement</Text>}>
                  <TouchableHighlight style={{width:30, height:30, borderRadius:30, backgroundColor:theme.colors.primary,justifyContent:'center',}}><Text h3 color="white" style={{textAlign:"center", fontSize:13,}}>10</Text></TouchableHighlight>
                  </Tooltip>
                  <Tooltip backgroundColor="white" overlayColor="rgba(0,0,0,0.15)" skipAndroidStatusBar={true} popover={<Text>Avg. PPG</Text>}>
                  <TouchableHighlight style={{width:30, height:30, borderRadius:30, marginLeft:5, backgroundColor:theme.colors.primary,justifyContent:'center',}}><Text h3 color="white" style={{textAlign:"center", fontSize:13,}}>60</Text></TouchableHighlight>
                  </Tooltip>
                  <Tooltip backgroundColor="white" overlayColor="rgba(0,0,0,0.15)" skipAndroidStatusBar={true} popover={<Text>Awards</Text>}>
                  <TouchableHighlight style={{width:30, height:30, borderRadius:30, marginLeft:5, backgroundColor:theme.colors.primary,justifyContent:'center',}}><Text h3 color="white" style={{textAlign:"center", fontSize:13,}}>1</Text></TouchableHighlight>
                  </Tooltip>
                  <Tooltip backgroundColor="white" overlayColor="rgba(0,0,0,0.15)" skipAndroidStatusBar={true} popover={<Text>Best Skills Score</Text>}>
                  <TouchableHighlight style={{width:30, height:30, borderRadius:30, marginLeft:5, backgroundColor:theme.colors.primary,justifyContent:'center',}}><Text h3 color="white" style={{textAlign:"center", fontSize:13,}}>90</Text></TouchableHighlight>
                </Tooltip>
              </Block>
            </Block>
            </Block>

            <Block flex={0.5} card shadow color="white" style={styles.headerChart}>
              <Block row space="between" style={{paddingHorizontal: 30}}>
                <Block flex={false} row center>
                  <Text h1>291 </Text>
                </Block>
                <Block flex={false} row center>
                  <Text h1>481 </Text>
                </Block>
              </Block>
              <Block flex={0.5} row space="between" style={{paddingHorizontal: 30}}>
                <Text caption light>Matches</Text>
                <Text caption light style={{marginRight:15}}>Days</Text>
              </Block>
              <Block flex={1}>{this.renderChart()}</Block>
            </Block>
          </Block>
         

        );
      }
    
    
      render() {
        return (
          <SafeAreaView style={styles.safe}>
            {this.renderHeader()}
            {this.renderBody()}
          </SafeAreaView>
        );
      }
}

const styles = StyleSheet.create({
    safe: {flex: 1, backgroundColor: theme.colors.primary},
    headerChart: {marginTop:20, paddingTop: 30, paddingBottom: 30, zIndex: 1},
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    marginRight: 5,
  },
  });
  