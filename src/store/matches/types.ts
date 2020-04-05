import { database, Types } from '../../database'
import { types } from '../events';

export const GET_MATCHES = "GET_MATCHES";
export const INIT_MATCHES_DB = 'INIT_MATCHES_DB';
export const DB_EXISTS = 'DB_EXISTS';
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

interface InitMatchesDBAction {
    type : typeof INIT_MATCHES_DB;
}

interface DBExistsAction {
    type : typeof DB_EXISTS;
    message ?: string;
}

export interface MatchesState {
    matches: Array<MatchDoc>;
}

export type MatchActionTypes = GetMatchesAction | InitMatchesDBAction | DBExistsAction | AddMatchesAction;