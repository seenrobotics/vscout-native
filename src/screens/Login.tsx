
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
const authUser = actions.user.authUser;

interface OwnProps {
    user: any;
    navigation:NavigationStackProp;
}

interface DispatchProps {
    authUser: () => any;
}

interface StateProps {
    user_credentials ?: User_Credentials;
    database_credentials ?: Database_Credentials
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
      this.props.authUser();
    }
    catch (error)
    {
      this.setState({...this.state, error_text:  `LOGIN FAILED : ${error.message}`});
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
          <Image style={styles.avatar} source={user.avatar} />
        </Block>
      
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.attemptAuthorize()}
        >
          <Text h3 white style={{fontSize:18, marginTop : 10, marginBottom : 10}}>
            LOGIN TO VSCOUT
            <Image 
              source={ { uri: 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/91_Discord_logo_logos-512.png' }}
              style={styles.logo}
            />
          </Text>
        </TouchableOpacity>
      </Block>
    );
  }
  render() 
  {
    return (
      <SafeAreaView style={styles.safe}>
            {this.renderHeader()}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state: types.RootState) => ({
  user_credentials : state.user.user_credentials,
  database_credentials : state.user.database_credentials,
  user : state.user.user,
});
  
export default connect(mapStateToProps, { authUser })(Login);

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: theme.colors.primary,  },
  button : {
      alignItems: "center",
      padding: 5,
      backgroundColor : "#7289DA"
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
});
  