import {combineReducers} from 'redux';
import {eventsReducer} from './events/reducers';

export const rootReducer = combineReducers({events: eventsReducer});