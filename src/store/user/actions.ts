import {User,  UserActionTypes, GET_USER, AUTH_USER, LOGOUT_USER, LOGIN_CREDENTIALS_ERROR, LOGIN_OFFLINE, UserState, Database_Credentials, Stored, User_Credentials} from './types'
import { Dispatch, AnyAction,  ActionCreator} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import { Types as DatabaseTypes, database, Database} from '../../database';
import { authorize , AuthorizeResult, revoke } from 'react-native-app-auth'
import { user as default_user} from '../../mocks'
import {config_discord, config_database} from '../../envars';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import Utils from '../../utils'

const config = {
  clientId: config_discord.client_id,
  clientSecret: config_discord.client_secret,
  redirectUrl: config_discord.redirect_link.android,
  scopes: ['email', 'identify', "guilds"],
  serviceConfiguration: {
    authorizationEndpoint: 'https://discordapp.com/api/oauth2/authorize',
    // authorizationEndpoint: `https://${config_database.IP}:${config_database.ports.auth}/auth/discord/token`,
    tokenEndpoint: `https://discordapp.com/api/oauth2/token`,
    revocationEndpoint: 'https://discordapp.com/api/oauth2/token/revoke'
  }
}
export const getUser : ActionCreator<
  ThunkAction<Promise<UserActionTypes>, UserState, void, AnyAction>
> = () => {
  return async (dispatch: ThunkDispatch<{}, {}, any>, getState): Promise<UserActionTypes> => {
    const user = await default_user;
    return dispatch({
      type : GET_USER,
      user
    })
  }
}

export const logoutUser : ActionCreator<
  ThunkAction<Promise<UserActionTypes>, UserState, void, AnyAction>
> = () => {
  return async (dispatch: ThunkDispatch<{}, {}, any>, getState): Promise<UserActionTypes> => {
    if(!getState().online) return dispatch({type : LOGOUT_USER, success: true,});
    
    const user = await default_user;
    let success = true;
    try {
      const clearCreds = clearCachedCredentials();
      const {token, password} = getState().database_credentials || {};
      const {accessToken} = getState().user_credentials || {};
      const sessionConfig = {
        username : token,
        password : password
      }
      const databaseLogout = axios.post(`http://${config_database.IP}:${config_database.ports.auth}/auth/logout`, sessionConfig)
      const discordLogout = accessToken ? revoke(config, {tokenToRevoke : accessToken, includeBasicAuth : false, sendClientId : false}) : {};
      const logoutStatus = await Promise.all([databaseLogout, discordLogout, clearCreds]);
      await logoutStatus;
      console.log({logoutStatus});
    } catch (error)
    {
      success = false;
    }
    console.log("logout success");
    return dispatch({
      type : LOGOUT_USER,
      success,
    })
  }
}
const login_discord : () => Promise<Stored<User_Credentials>> = async () => {
  try {
    const authResult = await authorize(config)
    return {...authResult, cached : false};
  }
  catch (error)
  {
    throw "authorize error"
  }
}
const login_database : (a : {accessToken : string}) => Promise<Stored<Database_Credentials>> = async ({accessToken} : {accessToken : string}) => {
  try {
    const access_token = accessToken;
    const oauthUrl = `http://${config_database.IP}:${config_database.ports.auth}/auth/discord/access/token`;
    const userResponse = await axios.post<{token : Database_Credentials}>(oauthUrl, {
      access_token
    });
    const userInfo = userResponse.data.token;
    return {...userInfo, cached : false};
  }
  catch (error)
  {
    throw {...error, message : "authorize database error"}
  }
}

export const authUserFresh : ActionCreator<
  ThunkAction<Promise<UserActionTypes>, {}, void, AnyAction>
> = () => {
  return authUserFreshFn;
}

export const authUserCached : ActionCreator<
  ThunkAction<Promise<UserActionTypes>, {}, void, AnyAction>
> = () => {
  return authUserCachedFn;
}

export const authOfflineUser : ActionCreator<
ThunkAction<Promise<UserActionTypes>, {}, void, AnyAction>
> = () => {
  return authOfflineUserFn;
}


const clearCachedCredentials = async () => await Promise.all([Keychain.resetGenericPassword({service : "discord"}), Keychain.resetGenericPassword({service : "discord"})]);

const getCachedCredentials = async () => {
  try {
  const discordCredentials = await Keychain.getGenericPassword({service : "discord"});
  const databaseCredentials = await Keychain.getGenericPassword({service : "database"});

  if(databaseCredentials && discordCredentials) {
    const discord : Stored<AuthorizeResult> = JSON.parse(discordCredentials.password);
    const database : Stored<Database_Credentials> = JSON.parse(databaseCredentials.password);
    return {discord, database};
  }

  await clearCachedCredentials();
  return false;
}
  catch (error)
  {
    console.log({trace: "Fetch Cached Credentials Error", error });
    throw error;
  }
}
const setCachedCredentials = async ({database, discord} : {database : Stored<Database_Credentials>, discord : Stored<AuthorizeResult>}) => {
  return await Promise.all([
    Keychain.setGenericPassword("discord", JSON.stringify({...discord, cached : true}), {service : "discord"}),
    Keychain.setGenericPassword("database", JSON.stringify({...database, cached : true}), {service : "database"})
  ]);
}
// 
const connect_database = async (creds : Database_Credentials) => {
  try {
    const auth = await Database.Utils.auth_database(config_database, creds);
    const database_config = {...config_database, username : creds.token, password : creds.password};
    await Database.initialize(database_config);
    return "OK_STATUS";
  } catch (error)
  {
    return {status : error.status, error : error}
  }
}

const authUserCachedFn = async (dispatch: ThunkDispatch<{}, {}, any>): Promise<UserActionTypes> => {
  
    const credentials = await getCachedCredentials();
    // If cached credentials are corrupted / don't exist.
    if(!credentials) return dispatch({type : LOGIN_CREDENTIALS_ERROR});
    
    try{
      const connect = await connect_database(credentials.database);
      if(connect == "OK_STATUS")
      {
        console.log("Log in successful")
        dispatch(getUser());
        return dispatch({
          type : AUTH_USER,
          user_credentials : credentials.discord,
          database_credentials : credentials.database
        });
      }
      // Handle server not available
      await clearCachedCredentials();
      
      return dispatch({type : LOGIN_CREDENTIALS_ERROR});
    } catch (error)
    {
      console.log({trace: "Fetch Cached Credentials Error, Authorize Database Invalid", error });
      throw error;
    }
}

const authOfflineUserFn = async (dispatch: ThunkDispatch<{}, {}, any>): Promise<UserActionTypes>  => {
  await Database.initialize_offline(config_database.db);
  return dispatch({
    type : LOGIN_OFFLINE
  })
}
const authUserFreshFn = async (dispatch: ThunkDispatch<{}, {}, any>): Promise<UserActionTypes> => {
  // Retrieve credentials
  try {
    const discord_credentials : Stored<AuthorizeResult> = await login_discord(); 
    const database_credentials : Stored<Database_Credentials> = await login_database(discord_credentials);
    const connect = await connect_database(database_credentials);
    if(connect == "OK_STATUS")
    {
       await setCachedCredentials({
        discord : discord_credentials,
        database : database_credentials,
      });
      console.log("Log in successful")
      dispatch(getUser());
      return dispatch({
        type : AUTH_USER,
        user_credentials : discord_credentials,
        database_credentials
      })
    }
    // Severe error or Server not up
    return dispatch({
      type : LOGIN_CREDENTIALS_ERROR,
    })
  }
  catch(error)
  {
    console.log(error)
    throw(error);
  }
}

const databaseErrorFn = async () => {

}