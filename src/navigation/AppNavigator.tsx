import React from 'react';
import {createAppContainer, withOrientation} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import EventStack from './EventStack';
import * as theme from '../constants/theme';
import Settings from '../screens/Settings';
import Login from '../screens/Login';
import Summary from '../screens/Summary';
import Teams from '../screens/Teams';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import teamStack from './teamStack';
  const routeConfigs = createMaterialTopTabNavigator({

    Summary: {screen: Summary,
        navigationOptions: {
            tabBarIcon: () => (
                <FontAwesome5Icon name="home" size={22} color={theme.colors.white} />            
            )
        }
    },
    Teams: {screen: teamStack,
        navigationOptions: {
            tabBarIcon: () => (
                <IoniconsIcon name="md-people" size={30} color={theme.colors.white} style={{marginTop:-3}}/>            
            )
        }},
    Scouting: {screen: EventStack,
        navigationOptions: {
            tabBarIcon: () => (
                <FontAwesome5Icon name="binoculars" size={22} color={theme.colors.white} />            
            )
        }}, 
    Settings: {screen: Settings,
        navigationOptions: {
            tabBarIcon: () => (
                <IoniconsIcon name="md-settings" size={26} color={theme.colors.white} style={{marginTop:-2}}/>            
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
