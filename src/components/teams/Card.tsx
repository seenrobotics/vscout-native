import React, { ReactNode, ReactComponentElement, ReactElement,  } from 'react';
import {StyleSheet} from 'react-native';

import {Text, Block} from '../index';
import * as theme from '../../constants/theme';

type ComponentFn = () => JSX.Element;

export interface CardProps {
  _id : string,
  leftHeader: string | ComponentFn;
  rightHeader: string | ComponentFn;
  leftBody: string | ComponentFn;
  rightBody: string | ComponentFn;
  rightContent: Array<any>;
}

const Card = (props: CardProps)  => {

  const leftHeader = (typeof props.leftHeader === "string") ? () => <Text small white style={{textTransform: 'uppercase'}}>{props.leftHeader}</Text> : props.leftHeader;
  const leftBody = (typeof props.leftBody === "string") ? () =>  <Text h3 white style={{marginHorizontal : 6, fontSize: 14}}>{props.leftBody}</Text>: props.leftBody;
  const rightHeader = (typeof props.rightHeader === "string") ? () => <Text h3 numberOfLines={2}>{props.rightHeader}</Text> : props.rightHeader;
  const rightBody = (typeof props.rightBody === "string") ? () => <Text light>{props.rightBody}</Text> : props.rightBody;

  return (
    <Block row card shadow color={theme.colors.white} style={styles.request}>
    <Block
      flex={0.2}
      card
      column
      color="secondary"
      style={styles.requestStatus}>
      <Block flex={0.25} middle center color={theme.colors.primary}>
          {leftHeader()}
      </Block>
      <Block flex={0.7} center middle>
          {leftBody()}
      </Block>
    </Block>
    <Block flex={0.75} column middle>
        {rightHeader()}
        {rightBody()}
      <Text caption semibold>
        {props.rightContent.map((rightContentItem, i) => {
          if (props.rightContent.length === i + 1) {
            return rightContentItem;
          } else {
            return rightContentItem + ' • ';
          }
        })}
      </Text>
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
  requestsHeader: {paddingHorizontal: 20, paddingBottom: 15},
  request: {padding: 15, marginBottom: 15},
  requestStatus: {marginRight: 20, overflow: 'hidden', height: 90},
});
