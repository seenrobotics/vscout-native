import React from 'react';

import AppNavigator from './AppNavigator';
import Settings from '../screens/Settings';
import {types} from '../store';
import {connect, MapStateToProps} from 'react-redux'; 
import {createStackNavigator as createSnackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/Login';

interface StateProps {
    signedIn : boolean ;
}
type Props = StateProps;

const Snack = createSnackNavigator();

const App = (props : Props) => {
    const {signedIn} = props;
    return ( 
    <NavigationContainer>
        <Snack.Navigator headerMode="none">
            {
            signedIn ? 
            <>
                <Snack.Screen component={AppNavigator} name="Main"/>
                <Snack.Screen component={Settings} name="Settings"/>
            </> :
                <Snack.Screen component={Login} name="Sign In"/>
            }
        </Snack.Navigator>
    </NavigationContainer>);
}

const mapStateToProps : MapStateToProps<StateProps, {}, types.RootState>= (state: types.RootState) => ({
    signedIn : state.user.signedIn,
});
export default connect(mapStateToProps)(App);