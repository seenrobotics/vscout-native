import {createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Events from '../screens/Events';
import MatchStack from './MatchStack';

const EventStack = createStackNavigator({
    Events: {
        screen: Events,
        navigationOptions: {
            headerShown: false,
          }
    },
    Matches: {
        screen: MatchStack,
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

export default createAppContainer(EventStack);
