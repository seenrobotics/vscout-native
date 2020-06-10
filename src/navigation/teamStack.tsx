import {createStackNavigator, TransitionPresets} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Teams from '../screens/Teams';
import TeamDetails from '../screens/TeamDetails';

const TeamStack = createStackNavigator({
    Teams: {
        screen: Teams,
        navigationOptions: {
            headerShown: false,
          }
    },
    TeamDetails: {
        screen: TeamDetails,
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

export default createAppContainer(TeamStack);
