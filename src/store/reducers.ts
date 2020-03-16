import {combineReducers} from 'redux';
import {eventsReducer} from './events/reducers';
import {matchesReducer} from './matches/reducers';


export const rootReducer = combineReducers({events: eventsReducer, matches: matchesReducer});