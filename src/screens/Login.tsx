
import React from 'react';
import {Image, SafeAreaView, StyleSheet, ActivityIndicator, View, Dimensions, ScrollView } from 'react-native';

import {Block, Text, Header} from '../components';
import * as theme from '../constants/theme';
import * as mocks from '../mocks';
import {types, actions} from '../store';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {NavigationStackProp} from 'react-navigation-stack';

import {connect} from 'react-redux'; 
import { User_Credentials, Database_Credentials } from '../store/user/types';
const {authUserFresh, authUserCached, authOfflineUser} = actions.user;

interface OwnProps {
    user: any;
    navigation:NavigationStackProp;
}

interface DispatchProps {
    authUserCached: () => any;
    authUserFresh: () => any;
    authOfflineUser: () => any;

}

interface StateProps {
    user_credentials ?: User_Credentials;
    database_credentials ?: Database_Credentials;
    signedIn : boolean;
    auth_attempted : boolean;
}

type Props = OwnProps & DispatchProps & StateProps;

class Login extends React.Component<Props, {error_text ?: string }> {
  public static defaultProps = {
      user: mocks.user,
  };
  state = {
         error_text : " "
  }
  async attemptAuthorize () {
    try {
      this.props.authUserFresh();
    }
    catch (error)
    {
      this.setState({...this.state, error_text:  `LOGIN FAILED : ${error.message}`});
    }
  }

  async loginOffline () {
    this.props.authOfflineUser();
  }
  
  async componentDidMount() {
    if(!this.props.auth_attempted)
    {
      await this.props.authUserCached();
    }
  }
  renderHeader() {
    const {user} = this.props;
    const {error_text} = this.state;

    return (
      <Block flex={0.42} column style={{paddingHorizontal: 15}}>
        <Block flex={false} row style={{paddingVertical: 15}}>
          <Block center>
            <Text h3 white style={{fontSize:21, marginRight: -(100 + 10 + 30)}}>
              {error_text || ""}
            </Text>
          </Block>
          <View style={{width:100, marginRight:10}}>
            <Text h4 white style={{fontSize:10, textAlign:'right'}}></Text>
            <Text h3 white style={{fontSize:15, textAlign:'right'}}></Text>
          </View>
        </Block>
        <Text h3 white style={{fontSize:18, marginTop : 10, marginBottom : 10}}>
          LOGIN TO VSCOUT
        </Text>
      
        <TouchableOpacity
          style={styles.discordButton}
          onPress={() => this.attemptAuthorize()}
        >
          <Text h3 white style={{fontSize:18, marginTop : 10, marginBottom : 10}}>
            LOGIN WITH DISCORD
            <Image 
              source={ { uri: 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/91_Discord_logo_logos-512.png' }}
              style={styles.logo}
            />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.offlineButton}
          onPress={() => this.loginOffline()}
        >
          <Text h3  style={{fontSize:18, marginTop : 10, marginBottom : 10}}>
            LOGIN OFFLINE
            <Image 
              source={ { uri: 'https://cdn.iconscout.com/icon/free/png-512/account-profile-avatar-man-circle-round-user-30452.png' }}
              style={styles.logo}
            />
          </Text>
        </TouchableOpacity>
      </Block>
    );
  }
  renderLoading() {
    return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
    )
  }
  render() 
  {
    return  (
      <SafeAreaView style={styles.safe}>
            {this.props.auth_attempted ? this.renderHeader() : this.renderLoading()}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state: types.RootState) => ({
  ...state.user
});
  
export default connect(mapStateToProps, { authUserFresh, authUserCached, authOfflineUser })(Login);

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: theme.colors.primary,  },
  discordButton : {
      alignItems: "center",
      padding: 5,
      backgroundColor : "#7289DA"
  },
  offlineButton : {
    alignItems: "center",
    padding: 5,
    marginTop : 20,
    backgroundColor : "#D3D3D3",
    color: "black"
  },
  logo : {
    transform: [{ scaleX:  false ? -1 : 1 }],
    width: 30,
    height: 30,
  },
  headerChart: {paddingTop: 30, paddingBottom: 30, zIndex: 1},
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    marginRight: 5,
  },
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});
  