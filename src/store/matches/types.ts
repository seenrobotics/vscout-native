import { Types } from '../../database'
import {MatchData as Model} from '../../models'

export type MatchData = Model;

export const GET_MATCHES = "GET_MATCHES";
export const ADD_MATCHES = 'ADD_MATCHES';

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