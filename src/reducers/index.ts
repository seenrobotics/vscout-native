import {combineReducers} from 'redux';
import eventsReducer, {Events} from './eventsReducer';

export interface State {
  events: Events;
}
const rootReducer = combineReducers<State>({events: eventsReducer});
export default rootReducer;
