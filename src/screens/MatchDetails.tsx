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
import {NavigationStackProp} from 'react-navigation-stack';


import {connect} from 'react-redux'; 
import { NavigationActions } from 'react-navigation';

interface OwnProps {
    type: string;
    user: any;
    chart: Array<number>;
    navigation:NavigationStackProp;
  }

  type Props = OwnProps;

export default class MatchDetails extends React.Component<Props, {}> {
    public static defaultProps = {
        user: mocks.user,
        chart: mocks.chart,
      };

    
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
          </Block>
        );
      }

    renderCard() {
        const matchData = this.props.navigation.state.params.docData;
        const redTeam1 = matchData.redTeamTop;
        const redTeam2 = matchData.redTeamBottom;
        const blueTeam1 = matchData.blueTeamTop;
        const blueTeam2 = matchData.blueTeamBottom;
        const redScore = matchData.redScore;
        const blueScore = matchData.blueScore;
        const id = matchData.id;
        console.log(matchData);
        return (
        <Block center style={{marginTop:-100,}}>
            <Text h1 style={{color:'white',}}>QUALIFIER {id}</Text>
            <Text h2 style={{color:'white', marginTop:75, fontSize:30,}}>{redTeam1} {redTeam2}</Text>
            <Text h1 style={{color:'white', marginTop:20, fontSize:50,}}>{redScore}</Text>
            <Text h1 style={{color:'white', marginTop:10, fontSize:50,}}>{blueScore}</Text>
            <Text h2 style={{color:'white', marginTop:20, fontSize:30,}}>{blueTeam1} {blueTeam2}</Text>
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
  