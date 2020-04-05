import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Events from '../screens/Events';
import Matches from '../screens/Matches';

const screens = {
    Events: {
        screen: Events,
    },
    Matches: {
        screen: Matches,
        params: {
            eventId:0
        }
    },
}

const EventStack = createStackNavigator(screens);

export default createAppContainer(EventStack);
