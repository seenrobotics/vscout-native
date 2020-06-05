

import {AuthorizeResult} from "react-native-app-auth"
export const GET_USER = "GET_USER";
export const AUTH_USER = "AUTH_USER";
export const LOGIN_CREDENTIALS_ERROR = "LOGIN_CREDENTIALS_ERROR";
export const LOGOUT_USER = "LOGOUT_USER";
export const SERVER_CONNECTION_ERROR = "SERVER_CREDENTIALS_ERROR";
export const LOGIN_OFFLINE = "LOGIN_OFFLINE";
export type Stored<T> =  {
    cached : boolean;
} & T;
export interface Database_Credentials {
    expires : number,
    ip : string;
    issued : string;
    password : string;
    token : string;
    provider : string;
    roles : string[];
    userDBs : object;
    user_id : string;
}
export interface User {
    _id : string, 
    userName : string, 
    fullName : string, 
    team : string,
    avatar ?: any,
}

export type User_Credentials = AuthorizeResult;

interface GetUserAction {
    type: typeof GET_USER;
    user : User;
}

interface LogoutUserAction {
    type : typeof LOGOUT_USER;
    success : boolean;
}

interface UserAuthAction {
    type: typeof AUTH_USER;
    user_credentials : User_Credentials;
    database_credentials : Database_Credentials;
}

interface LoginOfflineAction {
    type : typeof LOGIN_OFFLINE;
}

interface ServerCredentialsErrorAction {
    type : typeof SERVER_CONNECTION_ERROR;
}

interface LoginCredentialsErrorAction {
    type: typeof LOGIN_CREDENTIALS_ERROR;
}
export interface UserState {
    user_credentials ?: AuthorizeResult;
    database_credentials ?: Database_Credentials;
    user ?: User;
    auth_attempted : boolean;
    signedIn : boolean;
    online : boolean;
}

export type UserActionTypes = GetUserAction | UserAuthAction | LoginCredentialsErrorAction | LogoutUserAction | LoginOfflineAction | ServerCredentialsErrorAction;