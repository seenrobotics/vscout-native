import {    StyleSheet } from 'react-native'
import * as theme from '../../constants/theme';
import { stackOffsetNone } from 'd3-shape';

const style = StyleSheet.create({
    safe: {flex: 1, backgroundColor: theme.colors.primary},
    headerChart: {paddingTop: 30, paddingBottom: 30, zIndex: 1},
    avatar: {
      width: 30,
      height: 30,
      borderRadius: 30 / 2,
      marginRight: 5,
    },
    back:{
      width:50,
      marginTop:-5,
      marginLeft:10,
    },
  });
  
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

  export default style;