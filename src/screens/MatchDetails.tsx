import React from 'react';
import * as shape from 'd3-shape';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {Block, Text, Header} from '../components';
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
  winner: string;
}

type Props = OwnProps & StateProps;
export class MatchDetails extends React.Component<Props, OwnState> {
    public static defaultProps = {
        user: mocks.user,
        chart: mocks.chart,
      };
        state = {
          eventId: this.props.navigation.state.params?.eventId || 0,
          currentMatchId: this.props.navigation.state.params?.currentMatchId || 0,
          winner:"BLUE",
        }

    updateWinner() {
      if (this.props.matches[this.state.currentMatchId].docData.redScore == this.props.matches[this.state.currentMatchId].docData.blueScore) {
        this.setState(state => ({...state, winner :  "TIE"}));    
      }
      else if ((this.props.matches[this.state.currentMatchId].docData.redScore || 0) > (this.props.matches[this.state.currentMatchId].docData.blueScore || 0)) {
        this.setState(state => ({...state, winner :  "RED"}));    
      }
      else if ((this.props.matches[this.state.currentMatchId].docData.redScore || 0) < (this.props.matches[this.state.currentMatchId].docData.blueScore || 0)) {
        this.setState(state => ({...state, winner :  "BLUE"}));    
      } 
    }

    componentDidMount() {
      this.updateWinner();
    }     
    
      renderHeader() {
        return(
          <Header pageName={`Match Details`} backNavigationCB={this.props.navigation.pop} flex={0.1} ></Header>
        )
      }

    displayPreviousMatch = () => {
      if (this.state.currentMatchId >= 1) {
      this.setState({currentMatchId :  this.state.currentMatchId - 1}, () => {this.updateWinner()}); 
    }}
    
    displayNextMatch = () => {
      if (this.state.currentMatchId < this.props.matches.length -1) {
        this.setState({currentMatchId :  this.state.currentMatchId + 1}, () => {this.updateWinner()});
      }
    }

    renderCard() {
      const {currentMatchId} = this.state;
      const {matches} = this.props;
      
      return (
        <Block flex={0.88} style={{}}>
        <Block flex={1} row center style={{justifyContent:'space-between',paddingBottom:10,marginTop:-20,}}>
          <TouchableOpacity activeOpacity={0.8} onPress={this.displayPreviousMatch} style={{}}> 
          <MaterialIconsIcon name='navigate-before' size={50} color={theme.colors.white}/>
          </TouchableOpacity>
          <Text h1 style={{color:theme.colors.white, fontSize:25, paddingBottom:0,}}>QUALIFIER {matches[currentMatchId].docData.id}</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={this.displayNextMatch} style={{}}> 
          <MaterialIconsIcon name='navigate-next' size={50} color={theme.colors.white}/>
          </TouchableOpacity>
        </Block>

        <Block flex={2.5} center style={{marginTop:0,}}>
          <Block card shadow color={theme.colors.white} style={styles.headerChart}>
          <Block>
        <Text h1 style={{color:'dimgray', fontSize:40,}}>{this.state.winner}</Text>
        <Text h1 style={{color:theme.colors.primary, fontSize:50,}}>{matches[currentMatchId].docData.redScore} <Text style={{color:theme.colors.blue, fontSize:50,}}>{matches[currentMatchId].docData.blueScore}</Text></Text>
          </Block>
        </Block>
        </Block>

          <Block flex={5} stretch color="gray2" style={{marginTop:-100,paddingTop:100,}}>
          
            <Block style={{margin: 30, padding:20, marginBottom:0,paddingBottom:100,}} card shadow color={theme.colors.white}>
            <Text h1 style={{color:theme.colors.primary, fontSize:20,paddingBottom:5,}}>RED ALLIANCE</Text>
            <Text h2 style={{color:theme.colors.primary, marginTop:0, fontSize:35,}}>{matches[currentMatchId].docData.redTeamTop}  {matches[currentMatchId].docData.redTeamBottom}</Text>
            </Block>
            
            <Block style={{margin: 30, padding:20, marginBottom:0, paddingBottom:100,}} card shadow color={theme.colors.white}>
            <Text h1 style={{color:theme.colors.blue, fontSize:20,paddingBottom:5,}}>BLUE ALLIANCE</Text>
            <Text h2 style={{color:theme.colors.blue, marginTop:0, fontSize:35,}}>{matches[currentMatchId].docData.blueTeamTop}  {matches[currentMatchId].docData.blueTeamBottom}</Text>
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
  