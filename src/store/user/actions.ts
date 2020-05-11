import {User,  UserActionTypes, GET_USER, UserState, } from './types'
import { Dispatch, AnyAction,  ActionCreator} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import { Types as DatabaseTypes, database} from '../../database';
import { authorize } from 'react-native-app-auth'
import { user as default_user} from '../../mocks'
import {config_discord} from '../../envars'

const config = {
  clientId: config_discord.client_id,
  clientSecret: config_discord.client_secret,
  redirectUrl: config_discord.redirect_link.android,
  scopes: ['email', 'identify'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://discordapp.com/api/oauth2/authorize',
    tokenEndpoint: 'https://discordapp.com/api/oauth2/token',
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

export const loginDiscord : ActionCreator<
  ThunkAction<Promise<UserActionTypes>, {}, void, AnyAction>
> = () => {
  return async (dispatch: ThunkDispatch<{}, {}, any>): Promise<UserActionTypes> => {
    const user = await default_user;
    try {
      const authResult = await authorize(config)
      console.log({authResult});
    } catch (error) {
      console.log({error}, error.code);
      console.log(Object.keys(error));
    }
    return dispatch({
      type : GET_USER,
      user
    })
  }
}

