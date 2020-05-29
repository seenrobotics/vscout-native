import React from 'react';
import {StyleSheet, TouchableOpacity, ScrollView,} from 'react-native';
import {Text, Block} from '../index';
import {EventData} from '../../store/events/types';
import Utils from '../../utils';
import Card from './Card';

const CardList = (props: any) => {
  const {events, type, teams} = props;
  const cardRenders = teams.map((team) => ({
    key:team.key,
    leftBody: team.skillsRanking.toString(),
    rightHeader: team.teamOrg + team.teamLetter,
    rightBody: team.location,
    rightContent:[team.averagePlacement, team.averagePPG, team.totalAwards, team.bestDriverScore + team.bestProgrammingScore],
  }));
  return (
    <Block flex={0.8} column color="gray2" style={styles.requests}>
      <Block flex={false} row space="between" style={styles.requestsHeader}>
        <Text light>Recently Scouted Teams</Text>
        <TouchableOpacity activeOpacity={0.8}>
          <Text semibold>View All</Text>
        </TouchableOpacity>
      </Block>
      <ScrollView showsVerticalScrollIndicator={false}>
        {cardRenders ? (
          cardRenders.map((cardProps: React.ComponentProps<typeof Card>) => (
            <TouchableOpacity
              activeOpacity={0.8}
              key={`${type}-${cardProps.key}`}
              // onPress={
              //   () =>
              //   props.navigation.navigate('Matches', {eventId: cardProps._id})
              // }
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
