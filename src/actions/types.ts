import thunk, {ThunkAction} from 'redux-thunk';

interface GetEventsAction {
  type: 'GET_EVENTS';
  events: Array<any>;
}
export type Action = GetEventsAction;