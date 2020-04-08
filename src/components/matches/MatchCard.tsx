import React from 'react';
import {StyleSheet} from 'react-native';

import {Text, Block, Card} from '../index';
import {  MatchDoc, MatchData  } from '../../store/matches/types'
import {  events, matches } from '../../store/types'
import * as theme from '../../constants/theme';

export interface CardProps {
  _id : string;
  leftHeader: string;
  rightHeader: string;
  leftBody: string;
  rightBody: string;
  rightContent: Array<any>;
}



const MatchCard = (props: { match : MatchDoc}) =>  {
  const {match} = props;
  const cardProps = {
    _id: match._id,
    leftHeader: `${match.docData.blueScore} - ${match.docData.redScore}`,
    leftBody: match._id,
    rightHeader: `${match.docData.blueTeamTop} ${match.docData.blueTeamBottom} vs. ${match.docData.redTeamTop} ${match.docData.redTeamBottom}`,
    rightContent: [],
    rightBody: ""
  }

  return (
    <Card {...cardProps}/>
  );
};

export default MatchCard;

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
