import {
  GET_USER,
  AUTH_USER,
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
          ...action
        };
      case AUTH_USER:
        return {
          ...state,
          signedIn : true,
          ...action
        };
      default:
        return state;
    }
  }