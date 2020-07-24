import {MatchData,  GET_MATCHES, ADD_MATCHES, MatchActionTypes, } from './types'
import { Dispatch, AnyAction,  ActionCreator} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import { Types as DatabaseTypes, database} from '../../database';
let a = false;
export const getMatches : ActionCreator<
  ThunkAction<Promise<MatchActionTypes>, {}, void, AnyAction>
> = () => {
  return async (dispatch: ThunkDispatch<{}, {}, any>): Promise<MatchActionTypes> => {
    console.log("getMatches");
    if(!a)
    {
      const subscription = database().subscribe<MatchData>("match", async (change) => {
        const matches = await database().FetchLocalDB<MatchData>(DatabaseTypes.Collections.match);
        console.log("match change", {matches});
        dispatch({
          type : GET_MATCHES,
          matches,
        });
      });
      a = true;
    }
   
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
