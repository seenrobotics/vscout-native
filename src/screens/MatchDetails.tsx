import React from 'react';
import * as shape from 'd3-shape';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {Block, Text} from '../components';
import * as theme from '../constants/theme';
import * as mocks from '../mocks';
import {Card} from '../components/index';
import {Line} from 'react-native-svg';
import {LineChart, Path} from 'react-native-svg-charts';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {connect} from 'react-redux'; 
import { NavigationActions } from 'react-navigation';

interface OwnProps {
    type: string;
    user: any;
    chart: Array<number>;
    navigation:any;
  }

  type Props = OwnProps;

export default class MatchDetails extends React.Component<Props, {}> {
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
    
      renderHeader() {
        const {user} = this.props;
    
        return (
          <Block flex={0.42} column style={{paddingHorizontal: 15}}>
              <Block flex={false} row style={{paddingVertical: 15}}>
              <TouchableOpacity activeOpacity={0.8} onPress={()=>this.props.navigation.navigate('Matches')} style={styles.back}> 
            <IoniconsIcon name="ios-arrow-round-back" size={45} color="white"/>            
          </TouchableOpacity>
              <Block center>
              <Text h3 white style={{fontSize:19, marginRight: -(100 + 10 + 30 - 50 - 10), marginTop:3,}}>
                  Match Details
                </Text>
              </Block>
              <View style={{width:100, marginRight:10}}>
                <Text h4 white style={{fontSize:10, textAlign:'right'}}>Eshwar C.</Text>
                <Text h3 white style={{fontSize:15, textAlign:'right'}}>2381Y</Text>
              </View>
              <Image style={styles.avatar} source={user.avatar} />
            </Block>
            <Block card shadow color="white" style={styles.headerChart}>
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

    renderCard() {
        const id = this.props.navigation.getParam('id');
        const leftHeader = this.props.navigation.getParam('leftHeader'); 
        const rightHeader = this.props.navigation.getParam('rightHeader'); 
        const leftBody = this.props.navigation.getParam('leftBody'); 
        const rightBody = this.props.navigation.getParam('rightBody'); 
        
        return (
        <Block center style={{marginTop:20,}}>
            <Text h1 style={{color:'white',}}>Match Details</Text>
            <Text h2 style={{color:'white', marginTop:10,}}>{leftHeader}</Text>
            <Text h2 style={{color:'white',}}>{leftBody}</Text>
            <Text h2 style={{color:'white',}}>{rightHeader}</Text>
            <Text h2 style={{color:'white',}}>{rightBody}</Text>
        </Block>
        )
    }
      
    render() {
        return (
          <SafeAreaView style={styles.safe}>
                {this.renderHeader()}
                {this.renderCard()}
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
  back:{
    width:50,
    marginTop:-5,
    marginLeft:10,
  },
  });
  