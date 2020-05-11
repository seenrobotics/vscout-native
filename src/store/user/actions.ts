import {User,  UserActionTypes, GET_USER, AUTH_USER, UserState, Database_Credentials, Stored, User_Credentials} from './types'
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

export const authUser : ActionCreator<
  ThunkAction<Promise<UserActionTypes>, {}, void, AnyAction>
> = () => {
  return authUserFn;
}

const authUserFn = async (dispatch: ThunkDispatch<{}, {}, any>): Promise<UserActionTypes> => {
  // Retrieve credentials
  try {
    const storedDiscordCredentials = await Keychain.getGenericPassword({service : "discord"});
    const storedDBCredentials = await Keychain.getGenericPassword({service : "database"});
    const discord_credentials : Stored<AuthorizeResult> = storedDiscordCredentials ? JSON.parse(storedDiscordCredentials.password) : await login_discord(); 
    const database_credentials : Stored<Database_Credentials> = storedDBCredentials ? JSON.parse(storedDBCredentials.password) : await login_database(discord_credentials);
    const database_config = {...config_database, username : database_credentials.token, password : database_credentials.password};
    console.log({database_credentials, discord_credentials});
    try{
      await auth_database(database_credentials);
    }
    catch(error)
    {
      
      console.log("database token error")
      if(database_credentials.cached)
      {
        await Keychain.resetGenericPassword({service: "discord"})
        await Keychain.resetGenericPassword({service: "database"});
        return authUserFn(dispatch)
      }
      throw(error);
    }
    const database_sync = Database.initialize(database_config).Sync();

    await Keychain.setGenericPassword("discord", JSON.stringify({...discord_credentials, cached : true}), {service : "discord"});
    await Keychain.setGenericPassword("database", JSON.stringify({...database_credentials, cached : true}), {service : "database"});
    console.log("Log in successful")
    return dispatch({
      type : AUTH_USER,
      user_credentials : discord_credentials,
      database_credentials
    })
  }
  catch(error)
  {
    await Keychain.resetGenericPassword({service: "discord"})
    await Keychain.resetGenericPassword({service: "database"});
    console.log(error)
    throw(error);
  }
    
}