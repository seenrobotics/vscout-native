import React from 'react';
import {StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {Text, Block, Card} from '../index';
import {MatchData, MatchDoc} from '../../store/matches/types'
import Utils from '../../utils';
import MatchCard from './MatchCard'

const CardList : (props : any) => React.ReactElement = (props: any) => {
  console.log(' CardList props', {props})
  const {matches, type} = props;
  const cardRenders = matches;
  return (
    <Block flex={1} column color="gray2" style={styles.requests}>
      <Block flex={false} row space="between" style={styles.requestsHeader}>
        <Text h3>{Utils.capitalize(type)}es</Text>
      </Block>
      <ScrollView showsVerticalScrollIndicator={false}>
        {cardRenders ? (
          cardRenders
            .sort(
              (
                cardPropsA: React.ComponentProps<typeof Card>,
                cardPropsB: React.ComponentProps<typeof Card>,
              ) => {
                return cardPropsB._id > cardPropsA._id;
              },
            )
            .map((cardProps: MatchDoc) => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={`${type}-${cardProps._id}`}
                onPress={() => props.navigation.navigate('MatchDetails', cardProps)}
                >
                <MatchCard {...{match : cardProps}} />
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
  requestsHeader: {paddingHorizontal: 20, paddingVertical:5, marginBottom: 10},
  request: {padding: 20, marginBottom: 15},
  requestStatus: {marginRight: 20, overflow: 'hidden', height: 90},
});
