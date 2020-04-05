import React from 'react';
import {StyleSheet} from 'react-native';

import {Text, Block} from './index';
import * as theme from '../constants/theme';

export interface CardProps {
  id: number;
  leftHeader: string;
  rightHeader: string;
  leftBody: string;
  rightBody: string;
  rightContent: Array<any>;
}

const Card = (props: CardProps) => {
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
        <Text h3>
          {props.rightHeader}
        </Text>
        
        <Text light>
          {props.rightBody}
        </Text>
        <Text caption semibold>
          {props.rightContent.map((rightContentItem, i) => {
            if (rightContentLen === i + 1) {
              return rightContentItem;
            } else {
              return {rightContentItem} + ' • ';
            }
          })}
        </Text>
      </Block>
    </Block>
  );
};

export default Card;

const styles = StyleSheet.create({
  requests: {
    marginTop: -55,
    paddingTop: 55 + 20,
    paddingHorizontal: 15,
    zIndex: -1,
  },
  requestsHeader: {paddingHorizontal: 20, paddingBottom: 15},
  request: {padding: 15, marginBottom: 15},
  requestStatus: {marginRight: 20, overflow: 'hidden', height: 90},
});
