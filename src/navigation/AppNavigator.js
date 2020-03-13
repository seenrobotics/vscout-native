import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';

import Tournaments from '../screens/Tournaments';

const routeConfigs = {
  Tournaments: {screen: Tournaments},
};
export default createAppContainer(
  createDrawerNavigator(routeConfigs, {
    initialRouteName: 'Tournaments',
  }),
);
