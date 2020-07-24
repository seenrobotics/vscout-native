import React from 'react';
import EventStack from './EventStack';
import * as theme from '../constants/theme';
import Summary from '../screens/Summary';
import AddScouting from '../screens/AddScouting'
import { createMaterialTopTabNavigator  } from '@react-navigation/material-top-tabs';
import Teams from '../screens/Teams';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import teamStack from './teamStack';


const Tab = createMaterialTopTabNavigator();
const TabNavigatorOptions =  {
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
} as const;

const Tabs = () => {
    return (
        <Tab.Navigator {...TabNavigatorOptions}>
            <Tab.Screen name="Summary" component={Summary} options={{tabBarIcon : () => (<FontAwesome5Icon name="home" size={22} color={theme.colors.white} />)}}/>
            <Tab.Screen name="Events" component={EventStack} options={{tabBarIcon: () => (<FontAwesome5Icon name="flag" size={22} color={theme.colors.white}/>)}}/>
            <Tab.Screen name="Teams" component={teamStack} options={{tabBarIcon: () => (<FontAwesome5Icon name="users" size={22} color={theme.colors.white}/>)}}/>
            <Tab.Screen name="Scouting" component={AddScouting} options={{tabBarIcon: () => (<FontAwesome5Icon name="binoculars" size={22} color={theme.colors.white}/>)}}/>
        </Tab.Navigator>
    )
}
export default Tabs;