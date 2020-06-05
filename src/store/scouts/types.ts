import { Types } from '../../database'
import {ScoutData as Model} from '../../models'

export type ScoutData = Model;

export const GET_SCOUTS = "GET_SCOUTS";
export const ADD_SCOUTS = 'ADD_SCOUTS';

export type ScoutDoc = Types.DocumentBase<ScoutData>;

interface GetScoutsAction {
    type: typeof GET_SCOUTS;
    scouts: Array<ScoutDoc>;
}

interface AddScoutsAction {
    type : typeof ADD_SCOUTS,
}

export interface ScoutsState {
    scouts: Array<ScoutDoc>;
}

export type ScoutActionTypes = GetScoutsAction | AddScoutsAction;