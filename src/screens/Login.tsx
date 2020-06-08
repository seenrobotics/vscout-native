
import React from 'react';
import {Image, SafeAreaView, StyleSheet, ActivityIndicator, View, Dimensions, ScrollView, Text as NormalText } from 'react-native';

import {Block, Text, Header} from '../components';
import {Text as SVGText, Svg} from "react-native-svg";
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
const initialState =  {
  error_text : " ",
}
type Props = OwnProps & DispatchProps & StateProps;

class Login extends React.Component<Props, typeof initialState> {
  public static defaultProps = {
      user: mocks.user,
  };
  state = initialState;
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
    (this.props.authOfflineUser());

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
      <View style={{paddingHorizontal: 15, paddingVertical : 50}} >
        
          <View style={{flexDirection : "row", justifyContent : "center", }}>
            <Image 
                  source={ require("../assets/vscout-white.png")}
                  style={{
                    width: 60,
                    height: 60,
                    marginTop : 5,
                  }}
                  resizeMode="contain"
              />
            </View>
        <View style={{flexDirection : "row", justifyContent : "center"}}>
        <Text h3 white style={{fontSize:18, marginTop : 10, marginBottom : 10}}>Welcome To Vscout</Text>
        </View>
      </View>
    );
  }
  renderBody() {
    return (
      <View style={{padding : 20}}>
        <TouchableOpacity
          style={styles.discordButton}
          onPress={() => this.attemptAuthorize()}
        >
          <Image 
              source={ { uri: 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/91_Discord_logo_logos-512.png' }}
              style={styles.logo}
            />
          <Text h3 white style={styles.buttonText}>Sign In With Discord</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.offlineButton}
          onPress={() => this.loginOffline()}
        >
          <Image 
              source={ { uri: 'https://cdn.iconscout.com/icon/free/png-512/account-profile-avatar-man-circle-round-user-30452.png' }}
              style={styles.logo}
          />
          <Text h3  style={styles.buttonText}>Work Offline</Text>
        </TouchableOpacity>
      </View>
    )
  }
  renderFooter() {
    return (
      <View style={{position: 'absolute', left: 0, right: 0, bottom: 20,  flexDirection : "row", alignContent : "center", justifyContent : "center"}}>
        <Text h3 white style={{fontSize:18, marginTop : 20, marginRight : 15}}>Presented By</Text>
        <Image 
            source={ require("../assets/images/2381Logo_Simple.png")}
            style={{
              width: 60,
              height: 60,
              marginTop : 5,
            }}
            resizeMode="contain"
          />
      </View>
    )
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
        {this.props.auth_attempted ? <>{this.renderHeader()}{this.renderBody()}{this.renderFooter()}</> : this.renderLoading()}
      </SafeAreaView>
    );
  }
}


const mapStateToProps = (state: types.RootState) => ({
  ...state.user
});
  
export default connect(mapStateToProps, { authUserFresh, authUserCached, authOfflineUser })(Login);

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: theme.colors.secondary,  },
  discordButton : {
      alignItems: "center",
      flexDirection : 'row',
      padding: 15,
      borderRadius : 4,
      marginBottom : 18,
      backgroundColor : "#7289DA",
  },
  offlineButton : {
    alignItems: "center",
    flexDirection : 'row',
    padding: 15,
    borderRadius : 4,
    backgroundColor : "#D3D3D3",
    color: "black"
  },
  buttonText : {
    fontSize: 18, marginLeft : 14
  },
  logo : {
    width: 40,
    height: 40,
    marginTop : 5,
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
  