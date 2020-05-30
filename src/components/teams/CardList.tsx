import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {Text, Block} from '../index';
import {EventData} from '../../store/events/types';
import Utils from '../../utils';
import Card from './Card';
import { parseSync } from '@babel/core';
import { ThemeColors } from 'react-navigation';
import * as theme from '../../constants/theme';


const CardList = (props: any) => {
  const {events, type, teams} = props[0];
  const search = props[1].toLowerCase();
  const [sortBy, setSortBy] = useState("recent");

  useEffect(() => {
    if (sortBy === "recent") {
      setCards(cardRenders ? (
        cardRenders.filter((team)=> team.key.toLowerCase().includes(search))
        .map((cardProps: React.ComponentProps<typeof Card>) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={`${type}-${cardProps.key}`}
            // onPress={() =>props.navigation.navigate('Matches', {eventId: cardProps._id})}
            >
            <Card {...cardProps} />
          </TouchableOpacity>
        ))
      ) : (
        <Text>undefined</Text>
      ));
    }
    else if (sortBy == "rank"){
      setCards(cardRenders ? (
        cardRenders.sort((a, b) => {return a.leftBody - b.leftBody}).filter((team)=> team.key.toLowerCase().includes(search))
        .map((cardProps: React.ComponentProps<typeof Card>) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={`${type}-${cardProps.key}`}
            // onPress={() =>props.navigation.navigate('Matches', {eventId: cardProps._id})}
            >
            <Card {...cardProps} />
          </TouchableOpacity>
        ))
      ) : (
        <Text>undefined</Text>
      ));
    }
    else if (sortBy === "fav"){
      setCards(cardRenders ? (
        cardRenders.filter((team)=> team.favourite).filter((team)=> team.key.toLowerCase().includes(search))
        .map((cardProps: React.ComponentProps<typeof Card>) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={`${type}-${cardProps.key}`}
            // onPress={() =>props.navigation.navigate('Matches', {eventId: cardProps._id})}
            >
            <Card {...cardProps} />
          </TouchableOpacity>
        ))
      ) : (
        <Text>undefined</Text>
      ));
    }
  }, [search, sortBy]);

  const cardRenders = teams.map((team) => ({
    key:team.teamOrg + team.teamLetter,
    leftBody: team.skillsRanking.toString(),
    rightHeader: team.teamOrg + team.teamLetter,
    rightBody: team.location,
    rightContent:[team.averagePlacement, team.averagePPG, team.totalAwards, team.bestDriverScore + team.bestProgrammingScore],
    favourite: team.favourite,
  }));
  
  const [cards, setCards] = useState(cardRenders ? (
    cardRenders.filter((team)=> team.key.toLowerCase().includes(search))
    .map((cardProps: React.ComponentProps<typeof Card>) => (
      <TouchableOpacity
        activeOpacity={0.8}
        key={`${type}-${cardProps.key}`}
        // onPress={() =>props.navigation.navigate('Matches', {eventId: cardProps._id})}
        >
        <Card {...cardProps} />
      </TouchableOpacity>
    ))
  ) : (
    <Text>undefined</Text>
  ));

  return (
    <Block flex={0.8} column color="gray2" style={styles.requests}>
      <Block flex={false} row space="between" style={styles.requestsHeader}>
        <Text light>Recently Scouted Teams</Text>
        <TouchableOpacity activeOpacity={0.8}>
          <Picker
        selectedValue={sortBy}
        style={{ height: 20, width: 175, color:theme.colors.secondary, transform: [{ scaleX: 0.9 }, { scaleY: 0.9 },], top:-2}}
        mode= "dropdown"
        onValueChange={(itemValue, itemIndex) => setSortBy(itemValue)}
      >
        <Picker.Item color={theme.colors.secondary} label="Recently Scouted" value="recent" />
        <Picker.Item color={theme.colors.secondary} label="Rank" value="rank" />
        <Picker.Item color={theme.colors.secondary} label="Favourite" value="fav" />        
 </Picker>
 
        </TouchableOpacity>
        
      </Block>
      <ScrollView showsVerticalScrollIndicator={false}>
        {cards}
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
