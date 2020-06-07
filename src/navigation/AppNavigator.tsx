import React from 'react';
import {createAppContainer, withOrientation} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import EventStack from './EventStack';
import * as theme from '../constants/theme';
import Settings from '../screens/Settings';
import Summary from '../screens/Summary';
import AddScouting from '../screens/AddScouting'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
const routeConfigs = createMaterialTopTabNavigator(
    {
        Summary: {screen: Summary,
            navigationOptions: {
                tabBarIcon: () => (
                    <FontAwesome5Icon name="home" size={22} color={theme.colors.white} />            
                )
            }
        },
        Scouting: {screen: EventStack,
            navigationOptions: {
                tabBarIcon: () => (
                    <FontAwesome5Icon name="binoculars" size={22} color={theme.colors.white} />            
                )
        }}, 
        AddScouting : {
            screen : AddScouting,
            navigationOptions: {
                tabBarIcon: () => (
                    <FontAwesome5Icon name="binoculars" size={22} color={theme.colors.white} />            
                )
            }
        }
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
