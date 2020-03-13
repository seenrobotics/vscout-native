import React from 'react';

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
