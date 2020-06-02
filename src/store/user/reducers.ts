import {
  GET_USER,
  AUTH_USER,
  INVALID_CACHED_CREDENTIALS,
  LOGOUT_USER,
  UserActionTypes,
  UserState,

} from './types'

const initialState: UserState = {
    signedIn : false,
    auth_attempted : false,
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
          auth_attempted : true,
          ...action
        };
      case INVALID_CACHED_CREDENTIALS:
        return {
          ...state,
          auth_attempted : true,
        }
      case LOGOUT_USER:
        return {
          ...initialState,
          auth_attempted : true,
        }
      default:
        return state;
    }
  }