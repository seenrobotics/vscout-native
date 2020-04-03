import {
    EventsState,
    EventActionTypes,
    GET_EVENTS,
    INIT_EVENTS_DB,
    DB_EXISTS,
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

      case INIT_EVENTS_DB: 
        console.log("initializing db");
        return {
          ...state,
          database : action.database
        };
      
      case ADD_EVENTS:
        return {
          ...state
        }
      case DB_EXISTS: 
        console.log(action.message)
        return {
          ...state
        }

      default:
        return state;
    }
  }