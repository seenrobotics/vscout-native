import {StateType, ActionType} from 'typesafe-actions';
import {rootReducer} from './reducers'
import {types as events} from './events';
import {types as matches} from './matches';
import {types as user} from './user'
import {types as scout} from './scouts'
import {types as teams} from './teams'
export type RootState = ReturnType<typeof rootReducer>;

export {
    events, matches, user, teams, scout
}