const matches = [
  {
    id: 2,
    eventId: 3,
    blueTeamTop: '2381C',
    blueTeamBottom: '2381Y',
    redTeamTop: '4862B',
    redTeamBottom: '905A',
    blueScore: 19,
    redScore: 24,
  },
  {
    id: 3,
    eventId: 3,
    blueTeamTop: '5225A',
    blueTeamBottom: '1104V',
    redTeamTop: '4862B',
    redTeamBottom: '905A',
    blueScore: 60,
    redScore: 58,
  },
];

const events = [
  {
    id: 1,
    eventName: 'Lockheed Martin VEX EDR Qualifying Event ',
    eventType: 'Tournament',
    eventDate: '2020-01-11',
    numberOfMatches: 5,
  },
  {
    id: 2,
    eventName: 'Massey Vanier VEX EDR Qualifying Event ',
    eventType: 'Tournament',
    eventDate: '2020-01-11',
    numberOfMatches: 5,
  },
  {
    id: 3,
    eventName: 'Vex Ontario Provincial Championship ',
    eventType: 'Tournament',
    eventDate: '2020-01-11',
    numberOfMatches: 5,
  },
];

const chart = [
  1.1,
  3,
  1.5,
  2.3,
  3.2,
  7,
  8.2,
  1.2,
  2,
  1.2,
  8,
  3.8,
  5.8,
  3.9,
  5.1,
  0.1,
  6,
];

const user = {
  avatar: require('./assets/avatar.png'),
};

export {matches, events, chart, user};
