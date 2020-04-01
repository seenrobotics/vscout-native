import {
    EventsState,
    EventActionTypes,
    GET_EVENTS,
    ADD_EVENTS,
} from './types'

const initialState: EventsState = {
    events : [],
    
}
export function eventsReducer(state = initialState, action : EventActionTypes) : EventsState {
    switch (action.type) {
      case GET_EVENTS:
        return {
          ...state,
          events: action.events,
        };
      
      case ADD_EVENTS:
        return {
          ...state
        }

      default:
        return state;
    }
  }