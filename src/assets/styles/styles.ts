import {    StyleSheet } from 'react-native'
import * as theme from '../../constants/theme';

const style = StyleSheet.create({
    safe: {flex: 1, backgroundColor: theme.colors.primary},
    headerChart: {paddingTop: 30, paddingBottom: 30, zIndex: 1},
    avatar: {
      width: 30,
      height: 30,
      borderRadius: 30 / 2
    },
    back:{
      width:50,
      marginTop:-5,
      marginLeft:10,
    },
  });

  export default style;