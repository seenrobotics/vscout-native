

export const GET_USER = "GET_USER";

export interface User {
    _id : string, 
    userName : string, 
    fullName : string, 
    team : string,
    avatar ?: any,
}
interface GetUserAction {
    type: typeof GET_USER;
    user : User;
}


export interface UserState {
    user ?: User;
    signedIn : boolean;
}

export type UserActionTypes = GetUserAction;