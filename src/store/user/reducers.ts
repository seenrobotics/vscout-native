import {
  GET_USER,
  AUTH_USER,
  LOGIN_CREDENTIALS_ERROR,
  LOGOUT_USER,
  LOGIN_OFFLINE,
  UserActionTypes,
  UserState,
  User,
  SERVER_CONNECTION_ERROR

} from './types'

const initialState: UserState = {
    signedIn : false,
    online : true,
    auth_attempted : false,
}
const offlineUser : User = {
  _id : "OFFLINE",
  userName : "OFFLINE",
  fullName : "OFFLINE",
  team : "",
  avatar : {
    uri : 'https://cdn.iconscout.com/icon/free/png-512/account-profile-avatar-man-circle-round-user-30452.png'
  }
  
}
const offlineState : UserState = {
  signedIn : true,
  online : false,
  auth_attempted : true,
  user : offlineUser
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
      case LOGIN_CREDENTIALS_ERROR:
        return {
          ...state,
          signedIn : false,
          online : true,
          auth_attempted : true,
        }
      case LOGOUT_USER:
        return {
          ...initialState,
          auth_attempted : true,
        }
      case LOGIN_OFFLINE:
        return {
          ...offlineState,
        }
      case SERVER_CONNECTION_ERROR :
        return {
          ...initialState,
          auth_attempted : true,
          online : false,
        }
      default:
        return state;
    }
  }