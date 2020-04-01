import {
    EventsState,
    EventActionTypes,
    GET_EVENTS,
    CLOSE_SYNC,
    SYNC_EVENTS
} from './types'

const initialState: EventsState = {
    events : [],
    isSync : false,
}
export function eventsReducer(state = initialState, action : EventActionTypes) : EventsState {
    switch (action.type) {
      case GET_EVENTS:
        return {
          ...state,
          events: action.events,
        };
      case CLOSE_SYNC:
        return {
          ...state,
          isSync : false,
        };
      case SYNC_EVENTS:
        return {
          ...state,
          isSync : true,
        };
      default:
        return state;
    }
  }