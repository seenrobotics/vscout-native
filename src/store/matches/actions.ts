import {Match, GET_MATCHES, ADD_MATCHES, INIT_MATCHES_DB,  DB_EXISTS, MatchActionTypes, MatchesState} from './types'
import {bindActionCreators, Dispatch, AnyAction,  } from 'redux';
import {ThunkAction,} from 'redux-thunk';
import { Database, Types as DatabaseTypes} from '../../database';
import { databaseConfig } from '../../database/config';

import { RootState } from '../types';


export const initializeDatabase = (): ThunkAction<MatchActionTypes, MatchesState, {}, MatchActionTypes> => (
  dispatch: Dispatch<MatchActionTypes>, getState : () => MatchesState
): MatchActionTypes => {

  if(getState().database)
  {
    return dispatch({
      type : DB_EXISTS,
      message : "Matches Database Already Created"
    })
  }

  const config =  databaseConfig('matches');
  const OnData  = (docs : Array<DatabaseTypes.Document<Match>>) => {
    // Tell The Store About the data
    dispatch({
      type: GET_MATCHES,
      matches : docs.filter(dbEntry => dbEntry.DocData).map(({DocData, _id}) => { 
        return {...DocData, _id}
      })
    })
  }
  
  const database = new Database<Match>({config, OnData});
  database.Sync();
  return dispatch({
    type: INIT_MATCHES_DB,
    database
  });
};

export const addMatches = ({matches} : {matches : Array<Match>}) :  ThunkAction<MatchActionTypes, RootState, {}, MatchActionTypes> => (
  dispatch: Dispatch<MatchActionTypes>, getState : () => RootState
): MatchActionTypes => {

  const database = getState().matches.database;
  if(!database)
  {
    console.log("Database Undefined") 
  } else {
    database.AddData(matches)
  }
  return dispatch({
    type: ADD_MATCHES,
  })
}
