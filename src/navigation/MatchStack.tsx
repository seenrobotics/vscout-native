import {createStackNavigator, TransitionPresets} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Matches from '../screens/Matches';
import MatchDetails from '../screens/MatchDetails';

const MatchStack = createStackNavigator({
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
},
{
    defaultNavigationOptions: {
        ...TransitionPresets.SlideFromRightIOS,
      },
});

export default createAppContainer(MatchStack);
