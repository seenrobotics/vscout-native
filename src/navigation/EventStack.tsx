import {TransitionPresets} from 'react-navigation-stack';
import Events from '../screens/Events';
import Matches from '../screens/Matches';
import MatchDetails from '../screens/MatchDetails';
import {createStackNavigator as createSnackNavigator} from '@react-navigation/stack'
import React from 'react'
export type EventStackParamList = {
    'Events' : undefined;
    'Matches' : {eventId : string};
    'MatchDetails' : {
        eventId : string,
  currentMatchId : number;
    }
}
const Snack = createSnackNavigator<EventStackParamList>();

const EventStack = () => {
    return (
        <Snack.Navigator headerMode={"none"}>
            <Snack.Screen name="Events" component={Events} options={{...TransitionPresets.SlideFromRightIOS}} />
            <Snack.Screen name="Matches" component={Matches} options={{...TransitionPresets.SlideFromRightIOS}}   />
            <Snack.Screen name="MatchDetails" component={MatchDetails} options={{...TransitionPresets.SlideFromRightIOS}}/>
        </Snack.Navigator>
    )
}
export default EventStack;
