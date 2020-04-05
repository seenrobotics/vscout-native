import React from 'react';
import {createAppContainer, withOrientation} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import EventStack from './EventStack';
import Matches from '../screens/Matches';
import Settings from '../screens/Settings';

import Summary from '../screens/Summary';
import * as theme from '../constants/theme';

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';


// old drawer navigation
// const routeConfigs = createDrawerNavigator({
//   Events: {screen: Events},
//   Matches: {screen: Matches},
//   },
//   {
//   initialRouteName: 'Events',
//   });

  const routeConfigs = createMaterialTopTabNavigator({
    Summary: {screen: Summary,
        navigationOptions: {
            tabBarIcon: () => (
                <FontAwesome5Icon name="home" size={22} color="white" />            
            )
        }
    },
    Scouting: {screen: EventStack,
        navigationOptions: {
            tabBarIcon: () => (
                <FontAwesome5Icon name="binoculars" size={22} color="white" />            
            )
        }}, 
    Settings: {screen: Settings,
        navigationOptions: {
            tabBarIcon: () => (
                <IoniconsIcon name="md-settings" size={26} color="white" style={{marginTop:-2}}/>            
            )
        }},
    },
    {
    initialRouteName: 'Summary',
    tabBarPosition: 'bottom',
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

export default createAppContainer(routeConfigs);
