import {
    MatchesState,
    MatchActionTypes,
    GET_MATCHES,
    ADD_MATCHES,
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