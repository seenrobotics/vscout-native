import thunk, {ThunkAction} from 'redux-thunk';

interface GetEventsAction {
  type: 'GET_EVENTS';
  events: Array<any>;
}
interface GetMatchesAction {
  type: 'GET_MATCHES';
  matches: Array<any>;
}
export type Action = GetEventsAction | GetMatchesAction;
