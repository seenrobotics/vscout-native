import React from 'react';
import * as shape from 'd3-shape';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {Block, Text} from '../components';
import * as theme from '../constants/theme';
import * as mocks from '../mocks';
import {Line} from 'react-native-svg';
import {LineChart, Path} from 'react-native-svg-charts';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {NavigationStackProp} from 'react-navigation-stack';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {MatchDoc} from '../store/matches/types'
import { NavigationActions, NavigationRoute } from 'react-navigation';
import {types, actions} from '../store';
import { TouchableHighlight } from 'react-native-gesture-handler';


interface OwnProps {
    type: string;
    user: any;
    navigation:NavigationStackProp<NavigationRoute<NavigationParams>>;
}

type Props = OwnProps;
export default class TeamDetails extends React.Component<Props> {
    public static defaultProps = {
        user: mocks.user,
      };
      renderHeader() {
        const {user} = this.props;
        return (
          <Block flex={0.12} column style={{paddingHorizontal: 15}}>
              <Block flex={false} row style={{paddingVertical: 15}}>
              <TouchableOpacity activeOpacity={0.8} onPress={()=>this.props.navigation.goBack()} style={styles.back}> 
            <IoniconsIcon name="ios-arrow-round-back" size={45} color={theme.colors.white}/>            
          </TouchableOpacity>
              <Block center>
              <Text h3 white style={{fontSize:19, marginRight: -(100 + 10 + 30 - 50 - 10), marginTop:3,}}>
                  Team Details
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
      const teamKey = this.props.navigation.state.params.key;
      const team = mocks.teams.filter((team) => team.key === teamKey)[0];
      console.log(team);
      
      return (
<Block flex={1} row card shadow color={theme.colors.accent} style={styles.headerChart}>
                <Block flex={1}>
        <Block flex={3} color="" style={{justifyContent: 'center',}}><Text h1 style={{paddingLeft:15, fontSize:38, color:"white",}}>{team.teamOrg + team.teamLetter}</Text></Block>
        <Block flex={2} color="" style={{justifyContent: 'flex-start',}}><Text h3 style={{paddingLeft:15, fontSize:15,color:"white",}}>{team.location}</Text></Block>
                </Block>
                <Block flex={1} row>
                  <Block color="" flex={1} style={{alignItems:"center",}}>
                  <TouchableHighlight style={{width:28, height:28, borderRadius:28, marginBottom:5, backgroundColor:theme.colors.primary,justifyContent:'center',}}><Text h3 color="white" style={{textAlign:"center", fontSize:13,}}>{team.averagePlacement}</Text></TouchableHighlight>
                  <TouchableHighlight style={{width:28, height:28, borderRadius:28, marginBottom:5, backgroundColor:theme.colors.primary,justifyContent:'center',}}><Text h3 color="white" style={{textAlign:"center", fontSize:13,}}>{team.averagePPG}</Text></TouchableHighlight>
                  <TouchableHighlight style={{width:28, height:28, borderRadius:28, marginBottom:5, backgroundColor:theme.colors.primary,justifyContent:'center',}}><Text h3 color="white" style={{textAlign:"center", fontSize:13,}}>{team.totalAwards}</Text></TouchableHighlight>
                  <TouchableHighlight style={{width:28, height:28, borderRadius:28, marginBottom:5, backgroundColor:theme.colors.primary,justifyContent:'center',}}><Text h3 color="white" style={{textAlign:"center", fontSize:13,}}>{team.bestDriverScore + team.bestProgrammingScore}</Text></TouchableHighlight>
                  </Block>
                  <Block color="" flex={3}>
                  <Text h3 style={{color:"white", fontSize:13, paddingBottom:11, paddingTop:5,}}>Avg. Placement</Text>
                  <Text h3 style={{color:"white", fontSize:13, paddingBottom:11, paddingTop:5,}}>Avg. PPG</Text>
                  <Text h3 style={{color:"white", fontSize:13, paddingBottom:11, paddingTop:5,}}>Awards</Text>
                  <Text h3 style={{color:"white", fontSize:13, paddingBottom:11, paddingTop:5,}}>Skills Score</Text>
                  </Block>
                </Block>
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
    headerChart: {padding: 30, marginRight:30, marginLeft:30, zIndex: 1, flex:1, flexDirection: 'row',},
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
  