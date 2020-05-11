import { Types } from '../../database'

export const GET_TEAMS = 'GET_TEAMS';
export const ADD_TEAMS = 'ADD_TEAMS';

export interface TeamData {
    DOCUMENT_TYPE : typeof Types.Collections.team;
    teamOrg: number;
    teamLetter : string;
    location : string;
    
}

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