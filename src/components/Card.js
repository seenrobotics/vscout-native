import React from 'react';
import {StyleSheet} from 'react-native';

import Text from './Text';
import Block from './Block';
import * as theme from '../constants/theme';

const Card = props => {
const rightContentLen = props.rightContent.length;
  return (
    <Block row card shadow color="white" style={styles.request}>
      <Block
        flex={0.25}
        card
        column
        color="secondary"
        style={styles.requestStatus}>
        <Block flex={0.25} middle center color={theme.colors.primary}>
          <Text small white style={{textTransform: 'uppercase'}}>
            {props.leftHeader}
          </Text>
        </Block>
        <Block flex={0.7} center middle>
          <Text h2 white>
            {props.leftBody}
          </Text>
        </Block>
      </Block>
      <Block flex={0.75} column middle>
        <Text h3 style={{paddingVertical: 8}}>
          {props.rightHeader}
        </Text>
        <Text caption semibold>
            {props.rightContent.map((rightContentItem,i )=> {
                if (rightContentLen === i+1) {
                    return rightContentItem
                } else {
                return ({rightContentItem} + " • " )
                }
            })}
        </Text>
      </Block>
    </Block>
  );
};
/*
          {request.age}  {request.gender} • {request.distance}km •{' '}
          {request.time}hrs
*/
export default Card;


const styles = StyleSheet.create({
  requests: {
    marginTop: -55,
    paddingTop: 55 + 20,
    paddingHorizontal: 15,
    zIndex: -1,
  },
  requestsHeader: {paddingHorizontal: 20, paddingBottom: 15},
  request: {padding: 20, marginBottom: 15},
  requestStatus: {marginRight: 20, overflow: 'hidden', height: 90},
});
