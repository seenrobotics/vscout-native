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
    leftHeader: match.docData.time || '10:00 AM',
    leftBody: match.docData.type ? `${match.docData.type} ${match.docData.matchNumber}` : 'Q2',
    rightHeader: () => {
    const blueWin = match.docData.blueScore && match.docData.redScore  && match.docData.blueScore > match.docData.redScore;
    const redWin = match.docData.blueScore && match.docData.redScore  && match.docData.blueScore < match.docData.redScore;

    return (
    <Block row>
      <Block row flex={0.5} style={{ borderColor: 'blue', borderWidth: 2, padding: 4, marginRight: 3, borderRadius: 8, overflow: 'hidden', paddingLeft: 0}} card >
        <Block column flex={0.3} center middle>
          <Text title style={{ fontSize: 14, color: "blue"}}>{ `${match.docData.blueScore}`}</Text>
        </Block>
        <Block column flex={0.75} color={blueWin ? "blue" : "white"} style={{margin: -4, padding: 4, marginLeft: 0, paddingLeft: 0}}>
          <Text title right style={{color : blueWin ? "white" : "black"}}>{`${match.docData.blueTeamTop}`}</Text>
          <Text title right style={{color : blueWin ? "white" : "black"}}>{ `${match.docData.blueTeamBottom}`}</Text>
        </Block>
      </Block>
      <Block row flex={0.5} style={{  borderColor: 'red', borderWidth: 2, padding: 4, marginLeft: 2, borderRadius: 8, overflow: 'hidden', paddingRight: 0}} card>
        <Block column flex={0.75} color={redWin ? "red" : "white"} style={{margin: -4, padding: 4, marginRight: 0, paddingRight: 0}}>
          <Text title style={{color : redWin ? "white" : "black"}}>{ `${match.docData.redTeamTop}`}</Text>
          <Text title style={{color : redWin ? "white" : "black"}}>{ `${match.docData.redTeamBottom}`}</Text>
        </Block>
        <Block column flex={0.3} center middle>
          <Text right title style={{ fontSize: 14, color: "red"}}>{ `${match.docData.redScore}`}</Text>
        </Block>
      </Block>
    </Block>)},
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
