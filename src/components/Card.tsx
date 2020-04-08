import React, { ReactNode, ReactComponentElement, ReactElement,  } from 'react';
import {StyleSheet} from 'react-native';

import {Text, Block} from './index';
import * as theme from '../constants/theme';

export interface CardProps {
  _id : string,
  leftHeader: string;
  rightHeader: string;
  leftBody: string;
  rightBody: string;
  rightContent: Array<any>;
  children ?: ReactNode;
}

export interface CardBaseProps {
  _id : string, 
  leftHeader : ReactNode;
  rightHeader : ReactNode;
  leftBody: ReactNode;
  rightBody: ReactNode;
  rightContent: Array<any>;
}


export class CardBase extends React.Component<CardBaseProps, {}> {
  render () {
    return (
      <Block row card shadow color="white" style={styles.request}>
      <Block
        flex={0.25}
        card
        column
        color="secondary"
        style={styles.requestStatus}>
        <Block flex={0.25} middle center color={theme.colors.primary}>
            {this.props.leftHeader}
        </Block>
        <Block flex={0.7} center middle >
            {this.props.leftBody}
 
        </Block>
      </Block>
      <Block flex={0.75} column middle>

          {this.props.rightHeader}

        {this.props.children}

          {this.props.rightBody}

        <Text caption semibold>
          {this.props.rightContent.map((rightContentItem, i) => {
            if (this.props.rightContent.length === i + 1) {
              return rightContentItem;
            } else {
              return rightContentItem + ' • ';
            }
          })}
        </Text>
      </Block>
    </Block>
    )
  }
}

const Card = (props: CardProps)  => {
  return (
    <CardBase {...{
      ...props,
      leftHeader : <Text small white style={{textTransform: 'uppercase'}}>  {props.leftHeader} </Text>,
      leftBody : <Text h3 white style={{marginHorizontal : 6, fontSize: 14}}> {props.leftBody}  </Text>,
      rightHeader : <Text h3> {props.rightHeader} </Text>,
      rightBody : <Text light> {props.rightBody}</Text>
    }}
      />
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
