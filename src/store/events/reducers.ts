import {
    EventsState,
    EventActionTypes,
    GET_EVENTS,
} from './types'
import {
  error
} from '../types'
const initialState: EventsState = {
    events : []
}
export function eventsReducer(state = initialState, action : EventActionTypes) : EventsState {
    switch (action.type) {
      case GET_EVENTS:
        return {
          ...state,
          events: action.events,
        };
      case error.REQUEST_ERROR:
        console.error(action.error);
        return state;
      default:
        return state;
    }
  }