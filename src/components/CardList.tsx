import React from 'react';
import {StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {Text, Block, Card} from './index';
import {Event} from '../common/types';

const capitalize = (string: string) => {
  return string
    ? string.charAt(0).toUpperCase() + string.slice(1)
    : 'undefined';
};
const CardList = (props: any) => {
  const {data, type} = props;
  const cardRenders = data.events.map((cardProps: Event) => ({
    id: cardProps.id,
    leftHeader: cardProps.eventDate,
    leftBody: cardProps.eventType.substring(0, 1),
    rightHeader: cardProps.eventName,
    rightContent: [],
  }));
  return (
    <Block flex={0.8} column color="gray2" style={styles.requests}>
      <Block flex={false} row space="between" style={styles.requestsHeader}>
        <Text light>Recent {capitalize(type)}s</Text>
        <TouchableOpacity activeOpacity={0.8}>
          <Text semibold>View All</Text>
        </TouchableOpacity>
      </Block>
      <ScrollView showsVerticalScrollIndicator={false}>
        {cardRenders ? (
          cardRenders.map((cardProps: React.ComponentProps<typeof Card>) => (
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
