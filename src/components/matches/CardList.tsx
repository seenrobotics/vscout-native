import React from 'react';
import {StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {Text, Block} from '../index';
import {MatchData, MatchDoc} from '../../store/matches/types'
import Utils from '../../utils';
import MatchCard from './MatchCard'
import {NavigationRoute, NavigationParams} from 'react-navigation'
import {NavigationStackProp} from 'react-navigation-stack';

export interface CardListProps {
  matches : Array<MatchDoc>;
  eventId : number;
  type : string;
  navigation : NavigationStackProp<NavigationRoute<NavigationParams>>,
}
const CardList : (props : CardListProps) => React.ReactElement = (props: CardListProps) => {
  console.log(props)
  const {matches, type} = props;
  const cardRenders : Array<MatchDoc> = matches;
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
                cardPropsA: MatchDoc,
                cardPropsB: MatchDoc,
              ) => {
                return cardPropsB._id > cardPropsA._id ? 1 : 0;
              },
            )
            .map((matchDoc: MatchDoc, index : number) => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={`${type}-${matchDoc._id}`}
                onPress={() => props.navigation.navigate('MatchDetails', { currentMatchId:index, eventId:matchDoc.docData.eventId})}
                >
                <MatchCard {...{match : matchDoc}} />
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
