import {createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Events from '../screens/Events';
import MatchStack from './MatchStack';
import Login from '../screens/Login'

const LoginStack = createStackNavigator({ 
    Login: {
        screen: Login,
        navigationOptions: {
            headerShown: false,
          }
    },
},
{
    defaultNavigationOptions: {
        ...TransitionPresets.ModalSlideFromBottomIOS,
      },
});

export default createAppContainer(LoginStack);
