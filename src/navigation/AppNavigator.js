import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Events from '../screens/Events';
import Matches from '../screens/Matches';

// const routeConfigs = createDrawerNavigator({
//   Events: {screen: Events},
//   Matches: {screen: Matches},
//   },
//   {
//   initialRouteName: 'Events',
//   });

  const routeConfigs = createMaterialTopTabNavigator({
    Events: {screen: Events,},
    Matches: {
        screen: Matches,
        params: {
            eventId:0
        }
    },
    },
    {
    initialRouteName: 'Events',
    });

export default createAppContainer(routeConfigs);
