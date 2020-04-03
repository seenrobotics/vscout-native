import DB from '../../database/database'

export const GET_MATCHES = "GET_MATCHES";
export const INIT_MATCHES_DB = 'INIT_MATCHES_DB';
export const DB_EXISTS = 'DB_EXISTS';
export const ADD_MATCHES = 'ADD_MATCHES';

export interface Match {
    _id : string;
    eventId: string;
    blueTeamTop: string;
    blueTeamBottom: string;
    redTeamTop: string;
    redTeamBottom: string;
    blueScore: number;
    redScore: number;
}

interface GetMatchesAction {
    type: 'GET_MATCHES';
    matches: Array<Match>;
}

interface AddMatchesAction {
    type : typeof ADD_MATCHES,
}

interface InitMatchesDBAction {
    type : typeof INIT_MATCHES_DB;
    database : DB<Match>;
}

interface DBExistsAction {
    type : typeof DB_EXISTS;
    message ?: string;
}

export interface MatchesState {
    matches: Array<Match>;
    database ?: DB<Match>;
}

export type MatchActionTypes = GetMatchesAction | InitMatchesDBAction | DBExistsAction | AddMatchesAction;