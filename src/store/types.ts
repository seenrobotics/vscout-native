import {StateType, ActionType} from 'typesafe-actions';
import {rootReducer} from './reducers'

export type RootState = ReturnType<typeof rootReducer>;
