import React, {useState} from 'react';
import { useSelector, connect } from 'react-redux'
import {Block, Text} from '../components';

import { TouchableOpacity } from 'react-native-gesture-handler';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/FontAwesome';
import {Image, SafeAreaView, StyleSheet, Button, View, ViewStyle, StyleProp} from 'react-native';
import styles from '../assets/styles/styles'
import {types, actions, reducers, store} from '../store';
import {Picker} from 'react-native';
import { useDispatch } from 'react-redux'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { RootState } from '../store/types';
import style from '../assets/styles/styles';
import Dialog from "react-native-dialog"
const useThunkDispatch = () => useDispatch<typeof store.dispatch>();
export interface headerProps {
    pageName : string,
    backNavigationCB ?: () => any;
    flex ?: number,
    user ?: types.user.User;
    style ?: StyleProp<ViewStyle>,
    children ?: React.ReactNode,
    [index: string]: any;
}

const Header = (props : headerProps) => {
  const dispatch = useThunkDispatch();
  const [dialogVisible, setDialog] = useState(false);

  let _menu : Menu;
  const setMenuRef = (ref : Menu) => {
    _menu = ref;
  };
 
  const hideMenu = () => {
    _menu.hide();
  };
 
  const showMenu = () => {
    _menu.show();
  };

  const signOut = async () => {
    dispatch<any>(actions.user.logoutUser()) // huh this is dumb
    hideMenu();
  }
  const { pageName, backNavigationCB, user, style, children, flex, ...rest} = props;
  return  (
    <Block flex={ flex || 0.42} column style={{style, paddingHorizontal: 15, }} {...rest} >
      <Block flex={false} row style={{paddingVertical: 15}}>
      {
      backNavigationCB ? (
          <TouchableOpacity activeOpacity={0.8} onPress={backNavigationCB} style={{...styles.back}}> 
              <IoniconsIcon name="ios-arrow-round-back" size={45} color="white"/>            
          </TouchableOpacity>
      ) : null
      }
      <Block center flex={1} >
        <Text h3 white style={{fontSize:21, marginLeft : 35}} numberOfLines={1}>
          {pageName}
        </Text>
      </Block>

      <View style={Style.pickerWrapper}>
      <Menu
            ref={setMenuRef}
            button={
            <TouchableOpacity onPress={showMenu}>
              <Image style={styles.avatar} source={user?.avatar} />
            </TouchableOpacity>
            }
          >
            <MenuItem onPress={hideMenu}>
            <FeatherIcon name="user" style={{borderColor : "black", borderWidth : 1, color : "black"}}  />            
     
              <Text h4 style={{paddingLeft : 15}} numberOfLines={1}>  {user?.userName}</Text>
            </MenuItem>
            <MenuItem onPress={hideMenu}>Menu item 2</MenuItem>
            <MenuItem onPress={hideMenu} disabled>
              Menu item 3
            </MenuItem>
            <MenuDivider />
            <MenuItem onPress={()=>setDialog(true)} ><Text style={Style.signOutItem}>Sign Out</Text></MenuItem>
          </Menu>
      </View> 
      </Block>
      {
        children
      }
      <Dialog.Container visible={dialogVisible}>
          <Dialog.Title>Sign Out Confirmation</Dialog.Title>
          <Dialog.Description>
            Are you sure you want to sign out?
          </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={() => setDialog(false)} />
          <Dialog.Button label="Sign Out" onPress={signOut} />
      </Dialog.Container>
    </Block>
  );
}
const mapStateToProps = (state : RootState) => {
  return {
    user : state.user.user
  }
}

const Style = StyleSheet.create({
  signOutItem : {
    color : "red"
  },
  border : {
    borderWidth : 1,
    borderColor : "black",
  },
  pickerWrapper: {
    // borderColor: "blue",
    // borderWidth: 1,
    // backgroundColor: "#273137",
    borderRadius: 4
 },
 pickerIcon: {
    color: "red",
    position: "absolute",
    bottom: 15,
    right: 10,
    fontSize: 20
 },

 pickerContent: {
   borderColor: "black",
    borderWidth: 1,
    color: "yellow",
    backgroundColor: "transparent",
 },
})
const a : typeof Header =  connect(mapStateToProps)(Header);
export default a