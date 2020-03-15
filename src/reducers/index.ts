import {combineReducers} from 'redux';
import eventsReducer, {Events} from './eventsReducer';
import matchesReducer, {Matches} from './matchesReducer';

export interface State {
  events: Events;
  matches: Matches;
}
const rootReducer = combineReducers<State>({
  events: eventsReducer,
  matches: matchesReducer,
});
export default rootReducer;
