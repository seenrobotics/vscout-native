export interface Event {
  id: number;
  eventName: string;
  eventType: string;
  eventDate: string;
}
export interface Match {
  id: number;
  eventId: number;
  blueTeamTop: string;
  blueTeamBottom: string;
  redTeamTop: string;
  redTeamBottom: string;
  blueScore: number;
  redScore: number;
}
