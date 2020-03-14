import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';

import Events from '../screens/Events';

const routeConfigs = {
  Events: {screen: Events},
};
export default createAppContainer(
  createDrawerNavigator(routeConfigs, {
    initialRouteName: 'Events',
  }),
);
