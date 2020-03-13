import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';

import Blood from '../screens/Blood';

const routeConfigs = {
  Blood : {screen : Blood}
};
export default createAppContainer(createDrawerNavigator(routeConfigs, {
  initialRouteName : 'Blood',
}));
