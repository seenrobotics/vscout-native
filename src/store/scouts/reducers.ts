import {
    ScoutsState,
    ScoutActionTypes,
    GET_SCOUTS,
    ADD_SCOUTS,
} from './types'

const initialState: ScoutsState = {
    scouts : []
}
export function scoutsReducer(state = initialState, action : ScoutActionTypes) : ScoutsState {
    switch (action.type) {
      case GET_SCOUTS:
        return {
          ...state,
          scouts: action.scouts,
        };

      default:
        return state;
    }
  }