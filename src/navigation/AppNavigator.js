import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';

import Events from '../screens/Events';
import Matches from '../screens/Matches';

const routeConfigs = {
  Events: {screen: Events},
  Matches: {screen: Matches},
};
export default createAppContainer(
  createDrawerNavigator(routeConfigs, {
    initialRouteName: 'Events',
  }),
);
