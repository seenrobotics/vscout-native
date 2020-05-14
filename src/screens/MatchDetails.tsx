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
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {MatchDoc} from '../store/matches/types'
import { NavigationActions, NavigationRoute } from 'react-navigation';
import {types, actions} from '../store';


interface NavigationParams {
  matches : Array<MatchDoc>;
  currentMatchId : number;
}
interface OwnProps {
    type: string;
    user: any;
    chart: Array<number>;
    navigation:NavigationStackProp<NavigationRoute<NavigationParams>>;
}
interface StateProps {
    matches: Array<MatchDoc>;
}
interface OwnState{
  currentMatchId : number;
  eventId : number;
}

type Props = OwnProps & StateProps;
export class MatchDetails extends React.Component<Props, OwnState> {
    public static defaultProps = {
        user: mocks.user,
        chart: mocks.chart,
      };
      constructor (props: Props) {
        super(props)
        this.state = {
          eventId: this.props.navigation.state.params?.eventId || 0,
          currentMatchId: this.props.navigation.state.params?.currentMatchId || 0,
        }
     }
    
      renderHeader() {
        const {user} = this.props;
        
        return (
          <Block flex={0.12} column style={{paddingHorizontal: 15}}>
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

    displayPreviousMatch = () => {
      if (this.state.currentMatchId >= 1) {
      this.setState(state => ({...state, currentMatchId :  state.currentMatchId - 1}));    
      }
    }
    
      displayNextMatch = () => {
        if (this.state.currentMatchId < this.props.matches.length - 1) {
        this.setState(state => ({...state, currentMatchId :  state.currentMatchId + 1}));    
        }
      }

    renderCard() {
      const {currentMatchId} = this.state;
      const {matches} = this.props;
      console.log(matches);
        return (
        <Block flex={0.88} style={{}}>
        <Block flex={1} row center style={{justifyContent:'space-between',paddingBottom:10,marginTop:-20,}}>
          <TouchableOpacity activeOpacity={0.8} onPress={this.displayPreviousMatch} style={{}}> 
          <MaterialIconsIcon name='navigate-before' size={50} color='white'/>
          </TouchableOpacity>
          <Text h1 style={{color:'white', fontSize:25, paddingBottom:0,}}>QUALIFIER {matches[currentMatchId].docData.matchNumber}</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={this.displayNextMatch} style={{}}> 
          <MaterialIconsIcon name='navigate-next' size={50} color='white'/>
          </TouchableOpacity>
        </Block>

        <Block flex={2.5} center style={{marginTop:0,}}>
          <Block card shadow color="white" style={styles.headerChart}>
          <Block>
          <Text h1 style={{color:'dimgray', fontSize:40,}}>BLUE</Text>
        <Text h1 style={{color:theme.colors.primary, fontSize:50,}}>{matches[currentMatchId].docData.redScore} <Text style={{color:'dodgerblue', fontSize:50,}}>{matches[currentMatchId].docData.blueScore}</Text></Text>
          </Block>
        </Block>
        </Block>

          <Block flex={5} stretch color="gray2" style={{marginTop:-100,paddingTop:100,}}>
          
            <Block style={{margin: 30, padding:20, marginBottom:0,paddingBottom:100,}} card shadow color="white">
            <Text h1 style={{color:theme.colors.primary, fontSize:20,paddingBottom:5,}}>RED ALLIANCE</Text>
            <Text h2 style={{color:theme.colors.primary, marginTop:0, fontSize:35,}}>{matches[currentMatchId].docData.redTeamTop}  {matches[currentMatchId].docData.redTeamBottom}</Text>
            </Block>
            
            <Block style={{margin: 30, padding:20, marginBottom:0, paddingBottom:100,}} card shadow color="white">
            <Text h1 style={{color:'dodgerblue', fontSize:20,paddingBottom:5,}}>BLUE ALLIANCE</Text>
            <Text h2 style={{color:'dodgerblue', marginTop:0, fontSize:35,}}>{matches[currentMatchId].docData.blueTeamTop}  {matches[currentMatchId].docData.blueTeamBottom}</Text>
            </Block>
            
            <Block style={{margin: 30, padding:20, marginBottom:0, paddingBottom:100,}}>
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


const mapStateToProps = (state: types.RootState, ownProps: Props) => {
return {
  matches: state.matches.matches.filter(
      match => match.docData.eventId === ownProps.navigation.state.params?.eventId,  ),}
};

export default connect(mapStateToProps)(MatchDetails);

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
  