import React from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {Block, Text} from '../components';
import * as theme from '../constants/theme';
import * as mocks from '../mocks';
import {NavigationTabProp} from 'react-navigation-tabs';


import {connect} from 'react-redux'; 

interface OwnProps {
    type: string;
    user: any;
    navigation:NavigationTabProp;
  }

  type Props = OwnProps;

export default class Summary extends React.Component<Props, {}> {
    public static defaultProps = {
        user: mocks.user,
      };
    
      renderHeader() {
        const {user} = this.props;
    
        return (
          <Block flex={0.42} column style={{paddingHorizontal: 15}}>
              <Block flex={false} row style={{paddingVertical: 15}}>
              <Block center>
                <Text h3 white style={{fontSize:21, marginRight: -(100 + 10 + 30)}}>
                  Summary
                </Text>
              </Block>
              <View style={{width:100, marginRight:10}}>
                <Text h4 white style={{fontSize:10, textAlign:'right'}}>Eshwar C.</Text>
                <Text h3 white style={{fontSize:15, textAlign:'right'}}>2381Y</Text>
              </View>
              <Image style={styles.avatar} source={user.avatar} />
            </Block>
          </Block>
        );
      }
    render() {
        return (
          <SafeAreaView style={styles.safe}>
                {this.renderHeader()}
          </SafeAreaView>
        );
      }
}

const styles = StyleSheet.create({
    safe: {flex: 1, backgroundColor: theme.colors.primary},
    headerChart: {paddingTop: 30, paddingBottom: 30, zIndex: 1},
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    marginRight: 5,
  },
  });
  