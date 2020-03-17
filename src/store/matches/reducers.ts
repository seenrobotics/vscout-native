import {
    MatchesState,
    MatchActionTypes,
    GET_MATCHES,
} from './types'
import {
  error
} from '../types'
const initialState: MatchesState = {
    matches : []
}
export function matchesReducer(state = initialState, action : MatchActionTypes) : MatchesState {
    switch (action.type) {
      case GET_MATCHES:
        return {
          ...state,
          matches: action.matches,
        };
      case error.REQUEST_ERROR:
        console.error(action.error);
        return state;
      default:
        return state;
    }
  }