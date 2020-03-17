import {StateType, ActionType} from 'typesafe-actions';
import {rootReducer} from './reducers'
import {types as events} from './events';
import {types as matches} from './matches';
import * as error from './utils'
export type RootState = ReturnType<typeof rootReducer>;

export {
    events, matches, error
}