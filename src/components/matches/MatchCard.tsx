import React from 'react';
import {StyleSheet} from 'react-native';

import {Text, Block} from '../index';
import {  MatchDoc, MatchData  } from '../../store/matches/types'
import {  events, matches } from '../../store/types'
import * as theme from '../../constants/theme';
import { connect } from 'react-redux';
import { RootState } from '../../store/types';
export interface CardProps {
  _id : string;
  leftHeader: string;
  rightHeader: string;
  leftBody: string;
  rightBody: string;
  rightContent: Array<any>;
}

const MatchCard = (props: { match : MatchDoc, matches : MatchDoc[]}) =>  {
  const matchData = props.match;
  const id = matchData._id;
  console.log("DIE", {match : props.matches.find((value) => value._id==id)});
  const match  =  props.matches.find((value) => value._id == id) || matchData;
  const cardProps = {
    _id: match._id,
    leftHeader: match.docData.time || '10:00 AM',
    leftBody: match.docData.type ? `${match.docData.type} ${match.docData.matchNumber}` : 'Q2',
    rightHeader: () => {
    const blueWin = match.docData.blueScore && match.docData.redScore  && match.docData.blueScore > match.docData.redScore;
    const redWin = match.docData.blueScore && match.docData.redScore  && match.docData.blueScore < match.docData.redScore;

    return (
    <Block row>
      <Block row flex={0.5} style={{ borderColor: theme.colors.blue, borderWidth: 2, padding: 4, marginRight: 3, borderRadius: 8, overflow: 'hidden', paddingLeft: 0}} card >
        <Block column flex={0.3} center middle>
          <Text title style={{ fontSize: 14, color: theme.colors.blue}}>{ `${match.docData.blueScore}`}</Text>
        </Block>
        <Block column flex={0.75} color={blueWin ? theme.colors.blue : theme.colors.white} style={{margin: -4, padding: 4, marginLeft: 0, paddingLeft: 0}}>
          <Text title right style={{color : blueWin ? theme.colors.white : theme.colors.blue}}>{`${match.docData.blueTeamTop}`}</Text>
          <Text title right style={{color : blueWin ? theme.colors.white : theme.colors.blue}}>{ `${match.docData.blueTeamBottom}`}</Text>
        </Block>
      </Block>
      <Block row flex={0.5} style={{  borderColor: theme.colors.primary, borderWidth: 2, padding: 4, marginLeft: 2, borderRadius: 8, overflow: 'hidden', paddingRight: 0}} card>
        <Block column flex={0.75} color={redWin ? theme.colors.primary : theme.colors.white} style={{margin: -4, padding: 4, marginRight: 0, paddingRight: 0}}>
          <Text title style={{color : redWin ? theme.colors.white : theme.colors.primary}}>{ `${match.docData.redTeamTop}`}</Text>
          <Text title style={{color : redWin ? theme.colors.white : theme.colors.primary}}>{ `${match.docData.redTeamBottom}`}</Text>
        </Block>
        <Block column flex={0.3} center middle>
          <Text right title style={{ fontSize: 14, color: theme.colors.primary}}>{ `${match.docData.redScore}`}</Text>
        </Block>
      </Block>
    </Block>)},
    rightContent: [],
    rightBody: "",
  }
  const leftHeader = (typeof cardProps.leftHeader === "string") ? () => <Text small white style={{textTransform: 'uppercase'}}>{cardProps.leftHeader}</Text> : cardProps.leftHeader;
  const leftBody = (typeof cardProps.leftBody === "string") ? () =>  <Text h3 white style={{marginHorizontal : 6, fontSize: 14}}>{cardProps.leftBody}</Text>: cardProps.leftBody;
  const rightHeader = (typeof cardProps.rightHeader === "string") ? () => <Text h3 numberOfLines={2}>{cardProps.rightHeader}</Text> : cardProps.rightHeader;
  const rightBody = (typeof cardProps.rightBody === "string") ? () => <Text light>{cardProps.rightBody}</Text> : cardProps.rightBody;

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
        {cardProps.rightContent.map((rightContentItem, i) => {
          if (cardProps.rightContent.length === i + 1) {
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
const mapStateToProps = (state : RootState) => {
  return {
    matches : state.matches.matches
  }
}

export default connect(mapStateToProps)(MatchCard);

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
