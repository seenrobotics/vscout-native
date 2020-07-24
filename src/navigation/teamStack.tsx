
import {TransitionPresets} from 'react-navigation-stack';
import Events from '../screens/Events';
import Matches from '../screens/Matches';
import MatchDetails from '../screens/MatchDetails';
import {createStackNavigator as createSnackNavigator} from '@react-navigation/stack'
import React from 'react'
import Teams from '../screens/Teams';
import TeamDetails from '../screens/TeamDetails';

export type TeamStackParamList = {
    'Teams' : undefined;
    'TeamDetails' : {
        key : number;
    };
}
const Snack = createSnackNavigator<TeamStackParamList>();

const EventStack = () => {
    return (
        <Snack.Navigator headerMode={"none"}>
            <Snack.Screen name="Teams" component={Teams} options={{...TransitionPresets.SlideFromRightIOS}} />
            <Snack.Screen name="TeamDetails" component={TeamDetails} options={{...TransitionPresets.SlideFromRightIOS}}   />
        </Snack.Navigator>
    )
}
export default EventStack;

