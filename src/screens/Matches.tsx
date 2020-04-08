import * as shape from 'd3-shape';
import React from 'react';
import {Image, SafeAreaView, StyleSheet, Button, View, Dimensions, ScrollView } from 'react-native';

import {Line} from 'react-native-svg';
import {LineChart, Path} from 'react-native-svg-charts';

import {Block, Text, Header, Card} from '../components';
import {CardList} from '../components/matches';
import * as theme from '../constants/theme';
import * as mocks from '../mocks';
import {types, actions} from '../store';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {NavigationStackProp} from 'react-navigation-stack';
import {createAppContainer, withOrientation, } from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {connect} from 'react-redux';
import { user } from '../store/actions';
import { createStackNavigator } from '@react-navigation/stack'
// add this after other import statements
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import header from '../components/Header';
import { createMaterialTopTabNavigator as TopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';


interface InfoPageProps {
  event : types.events.EventDoc;
}
interface MatchesPageProps {

}

type tabPropTypes = InfoPageProps & MatchesPageProps;

const InfoPage = (props : InfoPageProps) => {
  const {event} = props;
  console.log({event})
  return <Block flex={1} style={styles.requests} column color="gray2">
    <Block color="white" column card style={{padding: 15, marginHorizontal : 15, marginBottom: 15}} shadow>

    <ScrollView showsVerticalScrollIndicator={false}>
      <Block flex={5} card shadow>
      <Text h3 style={{fontSize:20, marginRight: 3}}>
        {event.docData.eventName}
      </Text>
      </Block>
      <Block flex={1} style={{padding:5, marginVertical:10}}>
        <Text h3 style={{fontSize:20, marginRight: 3}}>
          {event.docData.eventType}
        </Text>
      </Block>

      <Block flex={1} style={{padding:5, marginVertical:10}}>
        <Text h3 style={{fontSize:20, marginRight: 3}}>
          Date : {event.docData.eventDate}
        </Text>
      </Block>
      
      
      
    
      
    </ScrollView>
    </Block>
  </Block>
};

const initialLayout = { width: Dimensions.get('window').width };

export function MatchesTabView(props :  tabPropTypes) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'second', title: 'Info', icon: 'file-alt', View: InfoPage },
    { key: 'first', title: 'Matches', icon: 'list', View : CardList},
  ]);

  const renderScene = ({ route } : { route : { key : string, View : (props : tabPropTypes) => JSX.Element } }) => {
    const {View} = route;
    return <View {...props}/>
  }
  return (
    <Block column style={styles.requests}>

      <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      style={{flex:1}}
      initialLayout={initialLayout}
      renderTabBar={props => <TabBar {...{...props, renderIcon : scene => <FontAwesome5Icon name={`${scene.route.icon}`} size={22} color={theme.colors.white} />, renderLabel : () => null}}/>}

    />
    </Block>
    
  );
}

const Tab = TopTabNavigator();
const a = connect( (state : types.RootState)=> ({ matches : state.matches.matches }))(Yoyeet);

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Matches" component={a} />
    </Tab.Navigator>
  );
}

function Yoyeet({ matches} : { matches : any}) {
  return <CardList {...{matches, type : 'Match'}}/>
}

const Navigator = (props : any) => {
    const navigator =  createMaterialTopTabNavigator({
    MatchList: {screen : ConnectedNav,
        navigationOptions: {
            tabBarIcon: () => (
                <FontAwesome5Icon name="home" size={22} color={theme.colors.white} />            
            )
        }
      },
      Otherthing: {screen : ConnectedNav,
        navigationOptions: {
            tabBarIcon: () => (
                <FontAwesome5Icon name="home" size={22} color={theme.colors.white} />            
            )
        }
      }
    },
    {
    initialRouteName: 'MatchList',
    tabBarPosition: 'top',
    tabBarOptions: {
        activeTintColor:'white',
        inactiveTintColor:'white',
        showIcon:true,
        showLabel:false,
        style: {
            backgroundColor: theme.colors.primary,
        },
        indicatorStyle:{
            height:2,
            backgroundColor:'white',
        }
    }
    });
    const Yee = createAppContainer(navigator);
    return <Yee/>
}


const getMatches  = actions.matches.getMatches;
const {getUser} = actions.user;
interface OwnProps {
  type: string;
  chart: Array<number>;
  navigation: NavigationStackProp;
}

interface DispatchProps {
  getMatches: () => any;
  getUser:() => any;

}
interface StateProps {
  matches: Array<types.matches.MatchDoc>;
  event : types.events.EventDoc;
  user ?: types.user.User;
}
type Props = OwnProps & DispatchProps & StateProps;

class Yeetus extends React.Component<any, {}> {
  render() {
    return (<CardList {...{...this.props, type : "Match"}}/>)
  }
}
const ConnectedNav = connect( (state : types.RootState)=> ({ matches : state.matches.matches }))(Yeetus);

class Matches extends React.Component<Props, {}> {
  public static defaultProps = {
    type: 'Match',
    chart: mocks.chart,
  };
  componentDidMount() {
    this.props.getUser();
    this.props.getMatches();
  }

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
          strokeWidth: 1.5,
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
    const {event, user} = this.props;

    return (
      <Block flex={0.1} column style={{paddingHorizontal: 15,}}>
       {Header({
         backNavigationCB : () => {this.props.navigation.navigate("Events")},
         pageName : `${event.docData.eventName}`,
         user : user
       })}
       
        {/* <Button
            title="Reload Data"
            onPress={() => this.props.getMatches()}
          /> */}
      </Block>
    );
  }

  cardList = () => <CardList {...this.props}/>


  render() {
      
    return (
      <SafeAreaView style={styles.safe}>
        {this.renderHeader()}
        <MatchesTabView {...this.props}/>
      </SafeAreaView>
    );
  }
}


const mapStateToProps = (state: types.RootState, ownProps: Props) => ({

  event: state.events.events.filter(
    event => event._id === ownProps.navigation.state.params?.eventId,
  )[0],
  matches: state.matches.matches.filter(
    match => match.docData.eventId === ownProps.navigation.state.params?.eventId,
    
  ),
  user : state.user.user,
});

export default connect(mapStateToProps, {getMatches, getUser})(Matches);

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
  scene: {
    flex: 1,
  },
  requests: {
    marginTop: -55,
    paddingTop: 55 + 20,
    // paddingHorizontal: 15,
    zIndex: -1,
  },
});

