import React from 'react';
import {Image, SafeAreaView, StyleSheet, View,} from 'react-native';
import {Block, Text} from '../components';
import {CardList} from '../components/teams';
import * as theme from '../constants/theme';
import * as mocks from '../mocks';
import {NavigationTabProp} from 'react-navigation-tabs';
import {connect} from 'react-redux';
import {types, actions} from '../store';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';

interface OwnProps {
    type: string;
    user: any;
    navigation:NavigationTabProp;
  }

  type Props = OwnProps;

export class Teams extends React.Component<Props, {}> {
    public static defaultProps = {
        user: mocks.user,
        events: mocks.events,
        userTeam: mocks.userTeam,
        teams: mocks.teams,
      };
      state = {
        search: '',
      };

      updateSearch = search => {
        this.setState({ search });
      };

    
      renderHeader() {
        const {user} = this.props;
        const {userTeam} = this.props;
        const {teams} = this.props;
        const {search} = this.state;
        return (
          <Block flex={0.7} column style={{paddingHorizontal: 15}}>
              <Block flex={false} row style={{paddingVertical: 15}}>
              <Block center>
                <Text h3 white style={{fontSize:21, marginRight: -(100 + 10 + 30)}}>
                  Teams
                </Text>
              </Block>
              <View style={{width:100, marginRight:10}}>
                <Text h4 white style={{fontSize:10, textAlign:'right'}}>{user.userName}</Text>
                <Text h3 white style={{fontSize:15, textAlign:'right'}}>{user.team}</Text>
              </View>
              <Image style={styles.avatar} source={user.avatar} />
            </Block>
            <Block flex={false} style={{paddingBottom:20,}}>
            <SearchBar
            platform = "default"
            lightTheme = {true}
            round = {true}
            containerStyle = {{backgroundColor:"transparent", borderBottomColor:"transparent", borderTopColor:"transparent", padding:0, margin:0,}}
            inputContainerStyle = {{backgroundColor:theme.colors.white,}}
            inputStyle={{color:theme.colors.darkgray, fontFamily: "Montserrat-Medium",}}
            placeholder="Search Teams"
            onChangeText={this.updateSearch}
            value={search}
            />
            </Block>
            <Block flex={false} row card shadow color={theme.colors.accent} style={styles.headerChart}>
                <Block flex={1}>
        <Block flex={3} color="" style={{justifyContent: 'center',}}><Text h1 style={{paddingLeft:15, fontSize:38, color:"white",}}>{userTeam.teamOrg + userTeam.teamLetter}</Text></Block>
        <Block flex={2} color="" style={{justifyContent: 'flex-start',}}><Text h3 style={{paddingLeft:15, fontSize:15,color:"white",}}>{userTeam.location}</Text></Block>
                </Block>
                <Block flex={1} row>
                  <Block color="" flex={1} style={{alignItems:"center",}}>
                  <TouchableHighlight style={{width:28, height:28, borderRadius:28, marginBottom:5, backgroundColor:theme.colors.primary,justifyContent:'center',}}><Text h3 color="white" style={{textAlign:"center", fontSize:13,}}>{userTeam.averagePlacement}</Text></TouchableHighlight>
                  <TouchableHighlight style={{width:28, height:28, borderRadius:28, marginBottom:5, backgroundColor:theme.colors.primary,justifyContent:'center',}}><Text h3 color="white" style={{textAlign:"center", fontSize:13,}}>{userTeam.averagePPG}</Text></TouchableHighlight>
                  <TouchableHighlight style={{width:28, height:28, borderRadius:28, marginBottom:5, backgroundColor:theme.colors.primary,justifyContent:'center',}}><Text h3 color="white" style={{textAlign:"center", fontSize:13,}}>{userTeam.totalAwards}</Text></TouchableHighlight>
                  <TouchableHighlight style={{width:28, height:28, borderRadius:28, marginBottom:5, backgroundColor:theme.colors.primary,justifyContent:'center',}}><Text h3 color="white" style={{textAlign:"center", fontSize:13,}}>{userTeam.bestSkillsScore}</Text></TouchableHighlight>
                  </Block>
                  <Block color="" flex={3}>
                  <Text h3 style={{color:"white", fontSize:13, paddingBottom:11, paddingTop:5,}}>Avg. Placement</Text>
                  <Text h3 style={{color:"white", fontSize:13, paddingBottom:11, paddingTop:5,}}>Avg. PPG</Text>
                  <Text h3 style={{color:"white", fontSize:13, paddingBottom:11, paddingTop:5,}}>Awards</Text>
                  <Text h3 style={{color:"white", fontSize:13, paddingBottom:11, paddingTop:5,}}>Best Skills Score</Text>
                  </Block>
                </Block>
            </Block>
          </Block>
        );
      }
    render() {
      const {search} = this.state;
      let passDown = [{...this.props}, search]
        return (
          <SafeAreaView style={styles.safe}>
                {this.renderHeader()}
                  <CardList {...passDown} />
          </SafeAreaView>
        );
      }
}

const styles = StyleSheet.create({
    safe: {flex: 1, backgroundColor: theme.colors.primary},
    headerChart: {paddingTop: 15, paddingBottom: 15, zIndex: 1},
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    marginRight: 5,
  },
  });
  
  const mapStateToProps = (state: types.RootState, ownProps: Props) => {
    return {
        events: state.events.events,
    }
    };
    
    export default connect(mapStateToProps)(Teams);