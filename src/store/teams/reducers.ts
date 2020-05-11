import {
    TeamsState,
    TeamActionTypes,
    GET_TEAMS,
    ADD_TEAMS,
} from './types'

const initialState: TeamsState = {
    teams : [],
    
}
export function teamsReducer(state = initialState, action : TeamActionTypes) : TeamsState {
    switch (action.type) {
      case GET_TEAMS:
        return {
          ...state,
          teams: action.teams,
        };
      
      case ADD_TEAMS:
        return {
          ...state
        }

      default:
        return state;
    }
  }