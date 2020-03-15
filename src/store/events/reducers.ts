import {
    EventsState,
    EventActionTypes,
    GET_EVENTS,
} from './types'

const initialState: EventsState = {
    events : []
}
export function eventsReducer(state = initialState, action : EventActionTypes) : EventsState {
    switch (action.type) {
      case GET_EVENTS:
        return {
          ...state,
          events: action.payload.events,
        };
      default:
        return state;
    }
  }