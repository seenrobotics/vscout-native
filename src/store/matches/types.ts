export const GET_MATCHES = "GET_MATCHES";

interface GetMatchesAction {
    type: 'GET_MATCHES';
    matches: Array<Match>;
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

export interface MatchesState {
    matches: Array<Match>
}

export type MatchActionTypes = GetMatchesAction;
  