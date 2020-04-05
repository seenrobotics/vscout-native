import {
    MatchesState,
    MatchActionTypes,
    GET_MATCHES,
    INIT_MATCHES_DB,
    ADD_MATCHES,
    DB_EXISTS,
} from './types'

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

      
      default:
        return state;
    }
  }