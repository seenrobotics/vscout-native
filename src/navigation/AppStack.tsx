import React from 'react';

import AppNavigator from './AppNavigator';
import LoginStack from './LoginStack';
import {types, actions} from '../store';
import {connect} from 'react-redux'; 
interface StateProps {
    signedIn : boolean ;
}
type Props = StateProps;

class App extends React.Component<Props> {
    render() {
        return this.props.signedIn ? (
            <AppNavigator/>
        ) :  (
            <LoginStack/>
        );
      }
}
const mapStateToProps = (state: types.RootState) => ({
    signedIn : state.user.signedIn,
  });
  
export default connect(mapStateToProps)(App);
