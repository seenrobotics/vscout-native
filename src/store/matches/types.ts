import {Match} from '../../models'
import {error} from '../types'
export const GET_MATCHES = "GET_MATCHES";
interface GetMatchesAction {
    type: 'GET_MATCHES';
    matches: Array<Match>;
}
export interface MatchesState {
    matches: Array<Match>
}

export type MatchActionTypes = GetMatchesAction | error.RequestErrorAction;
  