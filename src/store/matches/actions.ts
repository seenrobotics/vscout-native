import {MatchData,  GET_MATCHES, ADD_MATCHES, MatchActionTypes, } from './types'
import { Dispatch, AnyAction,  ActionCreator} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import { Types as DatabaseTypes, database} from '../../database';

export const getMatches : ActionCreator<
  ThunkAction<Promise<MatchActionTypes>, {}, void, AnyAction>
> = () => {
  return async (dispatch: ThunkDispatch<{}, {}, any>): Promise<MatchActionTypes> => {

    const matches = await database().FetchLocalDB<MatchData>(DatabaseTypes.Collections.match);

    return dispatch({
      type : GET_MATCHES,
      matches
    })

  }
}

export const addMatches = ({matches} : {matches : Array<MatchData>}) :  ThunkAction<MatchActionTypes, {}, {}, MatchActionTypes> => (
  dispatch: Dispatch<MatchActionTypes>
): MatchActionTypes => {
  if(!database)
  {
    console.log("Database Undefined") 
  } else {
    database().BulkAddData(matches)
  }
  return dispatch({
    type: ADD_MATCHES,
  })
}
