import {User,  UserActionTypes, GET_USER, UserState, } from './types'
import { Dispatch, AnyAction,  ActionCreator} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import { Types as DatabaseTypes, database} from '../../database';
import { user as default_user} from '../../mocks'

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
