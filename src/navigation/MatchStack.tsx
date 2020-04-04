import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Matches from '../screens/Matches';
import MatchDetails from '../screens/MatchDetails';

const screens = {
    Matches: {
        screen: Matches,
        params: {
            eventId:0
        },
        navigationOptions: {
            headerShown: false,
          }
    },
    MatchDetails: {
        screen: MatchDetails,
        navigationOptions: {
            headerShown: false,
          }
    },
}

const MatchStack = createStackNavigator(screens);

export default createAppContainer(MatchStack);
