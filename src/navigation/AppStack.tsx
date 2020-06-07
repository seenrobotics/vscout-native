import React from 'react';

import AppNavigator from './AppNavigator';
import Settings from '../screens/Settings'
import LoginStack from './LoginStack';
import {types, actions} from '../store';
import {connect} from 'react-redux'; 
import {createStackNavigator, TransitionPresets} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

interface StateProps {
    signedIn : boolean ;
}
type Props = StateProps;

const MainAppNavigator = createStackNavigator({ 
    Main: {
        screen: AppNavigator,
        navigationOptions: {
            headerShown: false,
          }
    },
    Settings : {
        screen : Settings
    }
},
{
    defaultNavigationOptions: {
        ...TransitionPresets.ModalSlideFromBottomIOS,
      },
});
const MainAppStack = createAppContainer(MainAppNavigator);

class App extends React.Component<Props> {
    render() {
        return this.props.signedIn ? (
            <MainAppStack/>
        ) :  (
            <LoginStack/>
        );
      }
}
const mapStateToProps = (state: types.RootState) => ({
    signedIn : state.user.signedIn,
  });
  
export default connect(mapStateToProps)(App);
