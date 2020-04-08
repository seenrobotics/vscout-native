import React from 'react';
import { useSelector } from 'react-redux'
import {Block, Text} from '../components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {Image, SafeAreaView, StyleSheet, Button, View} from 'react-native';
import styles from '../assets/styles/styles'
import {types, actions} from '../store';

export interface headerProps {
    pageName : string,
    backNavigationCB ?: () => any;
    user ?: types.user.User;
}

const Header = (props : headerProps) => {
    const { pageName, backNavigationCB, user } = props;
    return  <Block row style={{paddingVertical: 15}}>
    {
    backNavigationCB ? (
        <TouchableOpacity activeOpacity={0.8} onPress={backNavigationCB} style={{...styles.back}}> 
            <IoniconsIcon name="ios-arrow-round-back" size={45} color="white"/>            
        </TouchableOpacity>
    ) : null
    }
      <Block flex={2.5} style={{flexShrink : 2}} center>
      <Text numberOfLines={2} h3 white style={{fontSize:20, marginRight: 3}}>
          {pageName}
        </Text>
      </Block>
      <View style={{marginRight:5}}>
        <Text h4 white numberOfLines={1} style={{fontSize:10, textAlign:'right'}}>{user?.userName}</Text>
        <Text h3 white numberOfLines={1} style={{fontSize:15, textAlign:'right'}}>{user?.team.substring(0,6)}</Text>
      </View>
      <Image style={[styles.avatar, {flex : 0.5}]} source={user?.avatar} />
    </Block>
}

export default Header;