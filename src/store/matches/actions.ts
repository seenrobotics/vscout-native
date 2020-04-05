import {MatchData, MatchDoc, GET_MATCHES, ADD_MATCHES, INIT_MATCHES_DB,  DB_EXISTS, MatchActionTypes, MatchesState} from './types'
import {bindActionCreators, Dispatch, AnyAction,  ActionCreator} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import { Database, Types as DatabaseTypes, database} from '../../database';
import { databaseConfig } from '../../database/config';

import { RootState } from '../types';

export const getMatches : ActionCreator<
  ThunkAction<Promise<MatchActionTypes>, {}, void, AnyAction>
> = () => {
  return async (dispatch: ThunkDispatch<{}, {}, any>): Promise<MatchActionTypes> => {

    const matches = await database.FetchLocalDB<MatchData>(DatabaseTypes.Collections.match);

    return dispatch({
      type : GET_MATCHES,
      matches
    })

  }
}

export const addMatches = ({matches} : {matches : Array<MatchData>}) :  ThunkAction<MatchActionTypes, RootState, {}, MatchActionTypes> => (
  dispatch: Dispatch<MatchActionTypes>, getState : () => RootState
): MatchActionTypes => {

  if(!database)
  {
    console.log("Database Undefined") 
  } else {
    database.AddData(matches, DatabaseTypes.Collections.match)
  }
  return dispatch({
    type: ADD_MATCHES,
  })
}
