import {combineReducers} from 'redux';
import {eventsReducer as events} from './events/reducers';
import {matchesReducer as matches} from './matches/reducers';
import { userReducer as user } from './user/reducers'
import {scoutsReducer as scouts} from './scouts/reducers'
import { teamsReducer as teams} from './teams/reducers';

export const rootReducer = combineReducers({events, matches, user, teams, scouts});