const matches = [
  {
    id: 2,
    eventId: "54event\u00014ac4b69a0-0ab1-41b4-9de0-4ed3eb34d514\u0001\u0001",
    blueTeamTop: '2381C',
    blueTeamBottom: '2381Y',
    redTeamTop: '4862B',
    redTeamBottom: '905A',
    blueScore: 19,
    redScore: 24,
  },
  {
    id: 3,
    eventId: "54event\u00014ac4b69a0-0ab1-41b4-9de0-4ed3eb34d514\u0001\u0001",
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
    eventLocation: '149 Berrigan Dr., Ottawa, Ontario',
    eventType: 'Tournament',
    eventDate: '2020-01-11',
    numberOfMatches: 5,
  },
  {
    id: 2,
    eventName: 'Massey Vanier VEX EDR Qualifying Event ',
    eventLocation: '222, Rue Mercier, Cowansville, Quebec',
    eventType: 'Tournament',
    eventDate: '2020-01-11',
    numberOfMatches: 5,
  },
  {
    id: 3,
    eventName: 'Vex Ontario Provincial Championship ',
    eventLocation: '15 Glenview Avenue, St. Catharines, Ontario',
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
  _id : '1', 
  userName: "C9WIN",
  fullName : "Cloud9BestTeam",
  team : "CLOUD9",
  avatar: require('./assets/avatar.png'),
};

const teams = [
  {
    teamOrg: 2381,
    teamLetter : "Y",
    location : "Ottawa, Ontario, Canada",
    tournamentsAttended : 5,
    averagePlacement : 10,
    totalAwards : 1,
    averagePPG : 60,
    averagePPGAgainst: 45,
    bestDriverScore : 90,
    bestProgrammingScore: 5,
  },
  {
    teamOrg: 2381,
    teamLetter : "W",
    location : "Ottawa, Ontario, Canada",
    tournamentsAttended : 4,
    averagePlacement : 9,
    totalAwards : 1,
    averagePPG : 65,
    averagePPGAgainst: 35,
    bestDriverScore : 130,
    bestProgrammingScore: 5,
  },
  {
    teamOrg: 905,
    teamLetter : "A",
    location : "Toronto, Ontario, Canada",
    tournamentsAttended : 6,
    averagePlacement : 6,
    totalAwards : 5,
    averagePPG : 70,
    averagePPGAgainst: 40,
    bestDriverScore : 120,
    bestProgrammingScore:20,
  }
]

export {matches, events, chart, user, teams};
