import { Types } from '../../database'

export const GET_MATCHES = "GET_MATCHES";
export const ADD_MATCHES = 'ADD_MATCHES';

export interface MatchData {
    eventId: string;
    blueTeamTop: string;
    blueTeamBottom: string;
    redTeamTop: string;
    redTeamBottom: string;
    blueScore: number;
    redScore: number;
}
export type MatchDoc = Types.DocumentBase<MatchData>;
interface GetMatchesAction {
    type: 'GET_MATCHES';
    matches: Array<MatchDoc>;
}

interface AddMatchesAction {
    type : typeof ADD_MATCHES,
}

export interface MatchesState {
    matches: Array<MatchDoc>;
}

export type MatchActionTypes = GetMatchesAction | AddMatchesAction;