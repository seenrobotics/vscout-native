import React from 'react';
import {StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {Text, Block, Card} from '../index';
import {MatchData} from '../../store/matches/types'
import Utils from '../../utils';
import { AppRegistry } from 'react-native'; //these lines

const CardList : (props : any) => React.ReactElement = (props: any) => {
  console.log(' CardList props', {props})
  const {matches, type} = props;
  const cardRenders = matches.map(({_id, docData} : { _id : string, docData : MatchData}) => ({
    id: _id,
    leftHeader: `${docData.blueScore} - ${docData.redScore}`,
    leftBody: _id,
    rightHeader: `${docData.blueTeamTop} ${docData.blueTeamBottom} vs. ${docData.redTeamTop} ${docData.redTeamBottom}`,
    rightContent: [],
  }));
  return (
    <Block flex={1} column color="gray2" style={styles.requests}>
      <Block flex={false} row space="between" style={styles.requestsHeader}>
        <Text light>Recent {Utils.capitalize(type)}es</Text>
        <TouchableOpacity activeOpacity={0.8}>
          <Text semibold>View All</Text>
        </TouchableOpacity>
      </Block>
      <ScrollView showsVerticalScrollIndicator={false}>
        {cardRenders ? (
          cardRenders
            .sort(
              (
                cardPropsA: React.ComponentProps<typeof Card>,
                cardPropsB: React.ComponentProps<typeof Card>,
              ) => {
                return cardPropsB.id - cardPropsA.id;
              },
            )
            .map((cardProps: React.ComponentProps<typeof Card>) => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={`${type}-${cardProps.id}`}
                onPress={() => props.navigation.navigate('MatchDetails', cardProps)}
                >
                <Card {...cardProps} />
              </TouchableOpacity>
            ))
        ) : (
          <Text>undefined</Text>
        )}
      </ScrollView>
    </Block>
  );
};

export default CardList;

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
