import React from 'react';
import * as shape from 'd3-shape';
import {Image, SafeAreaView, StyleSheet, View, ScrollView} from 'react-native';
import {Block, Text} from '../components';
import * as theme from '../constants/theme';
import * as mocks from '../mocks';
import {Line} from 'react-native-svg';
import {LineChart, Path} from 'react-native-svg-charts';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, } from 'react-native-gesture-handler';
import {NavigationStackProp} from 'react-navigation-stack';
import {connect} from 'react-redux';
import {MatchDoc} from '../store/matches/types'
import { NavigationActions, NavigationRoute } from 'react-navigation';
import {types, actions} from '../store';
import { TouchableHighlight } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {RouteProp} from '@react-navigation/native'
import {TeamStackParamList} from '../navigation/teamStack'

interface OwnProps {
    type: string;
    user: any;
    navigation:any;
    route : RouteProp<TeamStackParamList, 'TeamDetails'>

  }

type Props = OwnProps;
export default class TeamDetails extends React.Component<Props> {
    public static defaultProps = {
        user: mocks.user,
      };
 
    

    toggleFavourite = () => {
      if (this.state.isFavourite) {
        this.setState({isFavourite:false, favouriteButtonStatus :<TouchableOpacity onPress={this.toggleFavourite}><FontAwesome name="star-o" size={30} color="gold" style={{padding:10,}}/></TouchableOpacity>});    
      }
      else {
        this.setState({isFavourite:true, favouriteButtonStatus :<TouchableOpacity onPress={this.toggleFavourite}><FontAwesome name="star" size={30} color="gold" style={{padding:10,}}/></TouchableOpacity>});    
      }
    }

    state = {
      favouriteButtonStatus:<TouchableOpacity onPress={this.toggleFavourite}><FontAwesome name="star-o" size={30} color="gold" style={{padding:10,}}/></TouchableOpacity>,
      isFavourite:false,
    }
    componentDidMount() {
      if (mocks.teams.filter((team) => team.key === this.props.route.params.key)[0].favourite) {
        this.state.isFavourite = true;
        this.setState(state => ({...state, favouriteButtonStatus :<TouchableOpacity onPress={this.toggleFavourite}><FontAwesome name="star" size={30} color="gold" style={{padding:10,}}/></TouchableOpacity>}));    
      }
  }

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
      const teamKey = this.props.route.params.key;
      const team = mocks.teams.filter((team) => team.key === teamKey)[0];
      return (
          <Block flex={0.18} row card shadow color={theme.colors.accent} style={styles.headerChart}>
            <Block flex={1}>
              <Block flex={3} row>
                <Block flex={4} style={{justifyContent: 'center',}}><Text h1 style={{fontSize:42, color:"white",}}>{team.teamOrg + team.teamLetter}</Text></Block>
                <Block flex={1}style={{justifyContent: 'center',}}>{this.state.favouriteButtonStatus}</Block>
               </Block>
              <Block flex={3} color="" style={{justifyContent: 'center',}}><Text h1 style={{fontSize:20, color:"white",}}>{team.teamName}</Text></Block>
              <Block flex={2} color="" style={{justifyContent: 'center',}}><Text h3 style={{fontSize:15,color:"white",}}>{team.location}</Text></Block>
            </Block>
          </Block>
      )
    }

    renderStats() {
      const teamKey = this.props.route.params.key;
      const team = mocks.teams.filter((team) => team.key === teamKey)[0];
      return(
        <Block flex={0.65} card shadow color={theme.colors.secondary} style={{paddingVertical:15, marginTop:20, marginRight:30, marginLeft:30,}}>
          <ScrollView>
          <Text h1 style={{fontSize:38, color:theme.colors.gray2, margin:0, paddingLeft:15,paddingBottom:8}}>Statistics</Text>
          <Block row>
          <Block color="" flex={0.7} style={{alignItems:"center",}}>
                  <TouchableHighlight style={{width:28, height:28, borderRadius:28, marginBottom:5, backgroundColor:theme.colors.primary,justifyContent:'center',}}><Text h3 color={theme.colors.white} style={{textAlign:"center", fontSize:13,}}>{team.tournamentsAttended}</Text></TouchableHighlight>
                  <TouchableHighlight style={{width:28, height:28, borderRadius:28, marginBottom:5, backgroundColor:theme.colors.primary,justifyContent:'center',}}><Text h3 color={theme.colors.white} style={{textAlign:"center", fontSize:13,}}>{team.averagePlacement}</Text></TouchableHighlight>
                  <TouchableHighlight style={{width:28, height:28, borderRadius:28, marginBottom:5, backgroundColor:theme.colors.primary,justifyContent:'center',}}><Text h3 color={theme.colors.white} style={{textAlign:"center", fontSize:13,}}>{team.totalAwards}</Text></TouchableHighlight>
                  <TouchableHighlight style={{width:28, height:28, borderRadius:28, marginBottom:5, backgroundColor:theme.colors.primary,justifyContent:'center',}}><Text h3 color={theme.colors.white} style={{textAlign:"center", fontSize:13,}}>{team.averagePPG}</Text></TouchableHighlight>
                  <TouchableHighlight style={{width:28, height:28, borderRadius:28, marginBottom:5, backgroundColor:theme.colors.primary,justifyContent:'center',}}><Text h3 color={theme.colors.white} style={{textAlign:"center", fontSize:13,}}>{team.averagePPGAgainst}</Text></TouchableHighlight>
                  <TouchableHighlight style={{width:28, height:28, borderRadius:28, marginBottom:5, backgroundColor:theme.colors.primary,justifyContent:'center',}}><Text h3 color={theme.colors.white} style={{textAlign:"center", fontSize:13,}}>{team.bestDriverScore}</Text></TouchableHighlight>
                  <TouchableHighlight style={{width:28, height:28, borderRadius:28, marginBottom:5, backgroundColor:theme.colors.primary,justifyContent:'center',}}><Text h3 color={theme.colors.white} style={{textAlign:"center", fontSize:13,}}>{team.bestProgrammingScore}</Text></TouchableHighlight>
                  <TouchableHighlight style={{width:28, height:28, borderRadius:28, marginBottom:5, backgroundColor:theme.colors.primary,justifyContent:'center',}}><Text h3 color={theme.colors.white} style={{textAlign:"center", fontSize:13,}}>{team.bestSkillsScore}</Text></TouchableHighlight>
                  <TouchableHighlight style={{width:28, height:28, borderRadius:28, marginBottom:5, backgroundColor:theme.colors.primary,justifyContent:'center',}}><Text h3 color={theme.colors.white} style={{textAlign:"center", fontSize:13,}}>{team.skillsRanking}</Text></TouchableHighlight>
                  </Block>
                  <Block color="" flex={3}>
                  <Text h3 style={{color:theme.colors.gray2, fontSize:13, paddingBottom:11, paddingTop:5,}}>Tournaments Attended</Text>
                  <Text h3 style={{color:theme.colors.gray2, fontSize:13, paddingBottom:11, paddingTop:5,}}>Avg. Placement</Text>
                  <Text h3 style={{color:theme.colors.gray2, fontSize:13, paddingBottom:11, paddingTop:5,}}>Awards</Text>
                  <Text h3 style={{color:theme.colors.gray2, fontSize:13, paddingBottom:11, paddingTop:5,}}>Avg. PPG</Text>
                  <Text h3 style={{color:theme.colors.gray2, fontSize:13, paddingBottom:11, paddingTop:5,}}>Avg. PPG Against</Text>
                  <Text h3 style={{color:theme.colors.gray2, fontSize:13, paddingBottom:11, paddingTop:5,}}>Best Driver Skills Score</Text>
                  <Text h3 style={{color:theme.colors.gray2, fontSize:13, paddingBottom:11, paddingTop:5,}}>Best Programming Skills Score</Text>
                  <Text h3 style={{color:theme.colors.gray2, fontSize:13, paddingBottom:11, paddingTop:5,}}>Best Skills Score</Text>
                  <Text h3 style={{color:theme.colors.gray2, fontSize:13, paddingBottom:11, paddingTop:5,}}>Skills World Ranking</Text>
                  </Block>
                  </Block>
          </ScrollView>
          
        </Block>
      )
    }
      
    render() {
        return (
          <SafeAreaView style={styles.safe}>
                {this.renderHeader()}
                {this.renderCard()}
                {this.renderStats()}
          </SafeAreaView>
        );
      }
}

const styles = StyleSheet.create({
    safe: {flex: 1, backgroundColor: theme.colors.primary},
    headerChart: {padding: 30, marginRight:30, marginLeft:30, zIndex: 1, flexDirection: 'row',},
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
  