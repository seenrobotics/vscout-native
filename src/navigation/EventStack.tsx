import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Events from '../screens/Events';
import MatchStack from './MatchStack';

const screens = {
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
}

const EventStack = createStackNavigator(screens);

export default createAppContainer(EventStack);
