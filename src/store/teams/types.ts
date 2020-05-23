import { Types } from '../../database'
import {TeamData as Model} from '../../models'

export type TeamData = Model;
export const GET_TEAMS = 'GET_TEAMS';
export const ADD_TEAMS = 'ADD_TEAMS';

export type TeamDoc = Types.DocumentBase<TeamData>

interface GetTeamsAction {
    type : typeof GET_TEAMS;
    teams: Array<TeamDoc>;
}

interface AddTeamsAction {
    type : typeof ADD_TEAMS,
}

export interface TeamsState {
    teams: Array<TeamDoc>;
}

export type TeamActionTypes = GetTeamsAction | AddTeamsAction;