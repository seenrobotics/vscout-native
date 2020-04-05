import {
  GET_USER,
  UserActionTypes,
  UserState
} from './types'

const initialState: UserState = {
    signedIn : false,
}
export function userReducer(state = initialState, action : UserActionTypes) : UserState {
    switch (action.type) {
      case GET_USER:
        return {
          ...state,
          user : action.user,
        };

      default:
        return state;
    }
  }