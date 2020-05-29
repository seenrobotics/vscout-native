import React, { ReactNode, ReactComponentElement, ReactElement,  } from 'react';
import {StyleSheet} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {Text, Block} from '../index';
import * as theme from '../../constants/theme';
import { Tooltip} from 'react-native-elements';


type ComponentFn = () => JSX.Element;

export interface CardProps {
  key: string,
  leftHeader: string | ComponentFn;
  rightHeader: string | ComponentFn;
  leftBody: string | ComponentFn;
  rightBody: string | ComponentFn;
  rightContent: Array<any>;
}

const Card = (props: CardProps)  => {

  const leftBody = (typeof props.leftBody === "string") ? () =>  <Text h3 white style={{marginHorizontal:6, fontSize: 20}}>{props.leftBody}</Text>: props.leftBody;
  const rightHeader = (typeof props.rightHeader === "string") ? () => <Text h3 style={{fontSize:22,}}numberOfLines={2}>{props.rightHeader}</Text> : props.rightHeader;
  const rightBody = (typeof props.rightBody === "string") ? () => <Text light style={{fontSize:15,}}>{props.rightBody}</Text> : props.rightBody;

  return (
    <Block row card shadow color={theme.colors.white} style={styles.request}>
    <Block
      flex={0.2}
      card
      column
      color="secondary"
      style={styles.requestStatus}>
      <Block flex={1} middle center color={theme.colors.secondary}>
          <Text h3 style={{color:"white", fontSize:12,}}>Rank</Text>
          {leftBody()}
      </Block>
    </Block>
    <Block flex={0.75} column middle>
      <Block style={{justifyContent:"flex-start", paddingTop:5,}}>
      {rightHeader()}
        {rightBody()}
      </Block>
        <Block>
                  <Block style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Tooltip backgroundColor="white" overlayColor="rgba(0,0,0,0.15)" skipAndroidStatusBar={true} popover={<Text>Average placement</Text>}>
                      <TouchableHighlight style={{width:30, height:30, borderRadius:30, marginRight:5, marginTop:5, backgroundColor:theme.colors.primary,justifyContent:'center',}}><Text h3 color="white" style={{textAlign:"center", fontSize:14,}}>{props.rightContent[0]}</Text></TouchableHighlight>
                    </Tooltip>
                    <Tooltip backgroundColor="white" overlayColor="rgba(0,0,0,0.15)" skipAndroidStatusBar={true} popover={<Text>Average PPG</Text>}>
                      <TouchableHighlight style={{width:30, height:30, borderRadius:30, marginRight:5, marginTop:5, backgroundColor:theme.colors.primary,justifyContent:'center',}}><Text h3 color="white" style={{textAlign:"center", fontSize:14,}}>{props.rightContent[1]}</Text></TouchableHighlight>
                    </Tooltip>
                    <Tooltip backgroundColor="white" overlayColor="rgba(0,0,0,0.15)" skipAndroidStatusBar={true} popover={<Text>Total Awards</Text>}>
                      <TouchableHighlight style={{width:30, height:30, borderRadius:30, marginRight:5, marginTop:5, backgroundColor:theme.colors.primary,justifyContent:'center',}}><Text h3 color="white" style={{textAlign:"center", fontSize:14,}}>{props.rightContent[2]}</Text></TouchableHighlight>
                    </Tooltip>
                    <Tooltip backgroundColor="white" overlayColor="rgba(0,0,0,0.15)" skipAndroidStatusBar={true} popover={<Text>Best Skills Score</Text>}>
                      <TouchableHighlight style={{width:30, height:30, borderRadius:30, marginRight:5, marginTop:5, backgroundColor:theme.colors.primary,justifyContent:'center',}}><Text h3 color="white" style={{textAlign:"center", fontSize:14,}}>{props.rightContent[3]}</Text></TouchableHighlight>
                    </Tooltip>
                  </Block>
        </Block>
    </Block>
  </Block>
  )
};

export default Card;

const styles = StyleSheet.create({
  requests: {
    marginTop: -55,
    paddingTop: 55 + 20,
    paddingHorizontal: 15,
    zIndex: -1,
  },
  requestsHeader: {paddingHorizontal: 15, paddingBottom: 15},
  request: {padding: 15, marginBottom: 15},
  requestStatus: {marginRight: 20, overflow: 'hidden',},
});
