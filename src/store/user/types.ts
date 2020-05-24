

import {AuthorizeResult} from "react-native-app-auth"
export const GET_USER = "GET_USER";
export const AUTH_USER = "AUTH_USER";
export const INVALID_CACHED_CREDENTIALS = "INVALID_CACHED_CREDENTIALS"
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

interface UserAuthAction {
    type: typeof AUTH_USER;
    user_credentials : User_Credentials;
    database_credentials : Database_Credentials;
}

interface InvalidCachedCredentialsAction {
    type: typeof INVALID_CACHED_CREDENTIALS;
}
export interface UserState {
    user_credentials ?: AuthorizeResult;
    database_credentials ?: Database_Credentials;
    user ?: User;
    auth_attempted : boolean;
    signedIn : boolean;

}

export type UserActionTypes = GetUserAction | UserAuthAction | InvalidCachedCredentialsAction;