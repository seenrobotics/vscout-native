import React from 'react';
import {StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {Text, Block, Card} from '../index';
import {MatchDoc} from '../../store/matches/types'
import Utils from '../../utils';

const CardList = (props: any) => {
  const {matches, type} = props;
  const cardRenders = matches.map((matchDoc: MatchDoc) => ({
    id: matchDoc._id,
    leftHeader: `${matchDoc.DocData.blueScore} - ${matchDoc.DocData.redScore}`,
    leftBody: matchDoc._id,
    rightHeader: `${matchDoc.DocData.blueTeamTop} ${matchDoc.DocData.blueTeamBottom} vs. ${matchDoc.DocData.redTeamTop} ${matchDoc.DocData.redTeamBottom}`,
    rightContent: [],
  }));
  return (
    <Block flex={0.8} column color="gray2" style={styles.requests}>
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
                key={`${type}-${cardProps.id}`}>
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
