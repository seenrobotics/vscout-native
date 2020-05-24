import {User,  UserActionTypes, GET_USER, AUTH_USER, INVALID_CACHED_CREDENTIALS, UserState, Database_Credentials, Stored, User_Credentials} from './types'
import { Dispatch, AnyAction,  ActionCreator} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import { Types as DatabaseTypes, database, Database} from '../../database';
import { authorize , AuthorizeResult } from 'react-native-app-auth'
import { user as default_user} from '../../mocks'
import {config_discord, config_database} from '../../envars';
import { Linking } from 'react-native'
import InAppBrowser from 'react-native-inappbrowser-reborn';
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
  ThunkAction<Promise<UserActionTypes>, {}, void, AnyAction>
> = () => {
  return async (dispatch: ThunkDispatch<{}, {}, any>): Promise<UserActionTypes> => {
    const user = await default_user;
    return dispatch({
      type : GET_USER,
      user
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
const auth_database = async (creds : Database_Credentials) => {
  const sessionUrl = `http://${config_database.IP}:${config_database.ports.db}/_session`;
  const sessionConfig = {
    username : creds.token,
    password : creds.password
  }
  console.log({sessionConfig, sessionUrl});
  const confirm_session = await axios.get(sessionUrl,{auth : sessionConfig}) 
  return confirm_session
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
const connect_database = async (creds : Database_Credentials) => {
  try {
    const auth = await auth_database(creds);
    const database_config = {...config_database, username : creds.token, password : creds.password};
    await Database.initialize(database_config).Sync();
    return "OK_STATUS";
  } catch (error)
  {
    return {status : error.status, error : error}
  }
}

const authUserCachedFn = async (dispatch: ThunkDispatch<{}, {}, any>): Promise<UserActionTypes> => {
    const credentials = await getCachedCredentials();
    // If cached credentials are corrupted / don't exist.
    if(!credentials) return dispatch({type : INVALID_CACHED_CREDENTIALS});
    
    try{
      const connect = await connect_database(credentials.database);
      if(connect == "OK_STATUS")
      {
        console.log("Log in successful")
        return dispatch({
          type : AUTH_USER,
          user_credentials : credentials.discord,
          database_credentials : credentials.database
        });
      }
      // Handle server not available
      await clearCachedCredentials();
      return dispatch({type : INVALID_CACHED_CREDENTIALS});
    } catch (error)
    {
      console.log({trace: "Fetch Cached Credentials Error, Authorize Database Invalid", error });
      throw error;
    }
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
      return dispatch({
        type : AUTH_USER,
        user_credentials : discord_credentials,
        database_credentials
      })
    }
    // Severe error or Server not up
    return dispatch({
      type : INVALID_CACHED_CREDENTIALS,
    })
  }
  catch(error)
  {
    console.log(error)
    throw(error);
  }
}