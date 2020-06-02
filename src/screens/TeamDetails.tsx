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


interface OwnProps {
    type: string;
    user: any;
    navigation:NavigationStackProp<NavigationRoute<NavigationParams>>;
}
interface NavigationParams {
  matches : Array<MatchDoc>;
  currentMatchId : number;
}
type Props = OwnProps;
export class MatchDetails extends React.Component<Props> {
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
      return (
        <Block flex={0.88} style={{}}>
        <Block flex={1} row center style={{justifyContent:'center',paddingBottom:10,marginTop:-20,}}>
          <Text h1 style={{color:theme.colors.white, fontSize:25, paddingBottom:0,}}>QUALIFIER</Text>
        </Block>

        <Block flex={2.5} center style={{marginTop:0,}}>
          <Block card shadow color={theme.colors.white} style={styles.headerChart}>
          <Block>
        <Text h1 style={{color:'dimgray', fontSize:40,}}>Test</Text>
        <Text h1 style={{color:theme.colors.primary, fontSize:50,}}>5 <Text style={{color:theme.colors.blue, fontSize:50,}}>10</Text></Text>
          </Block>
        </Block>
        </Block>

          <Block flex={5} stretch color="gray2" style={{marginTop:-100,paddingTop:100,}}>
          
            <Block style={{margin: 30, padding:20, marginBottom:0,paddingBottom:100,}} card shadow color={theme.colors.white}>
            <Text h1 style={{color:theme.colors.primary, fontSize:20,paddingBottom:5,}}>RED ALLIANCE</Text>
            <Text h2 style={{color:theme.colors.primary, marginTop:0, fontSize:35,}}>1234  1234</Text>
            </Block>
            
            <Block style={{margin: 30, padding:20, marginBottom:0, paddingBottom:100,}} card shadow color={theme.colors.white}>
            <Text h1 style={{color:theme.colors.blue, fontSize:20,paddingBottom:5,}}>BLUE ALLIANCE</Text>
            <Text h2 style={{color:theme.colors.blue, marginTop:0, fontSize:35,}}>1234  1234</Text>
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
  