import {ScoutData,  GET_SCOUTS, ADD_SCOUTS, ScoutActionTypes, } from './types'
import { Dispatch, AnyAction,  ActionCreator} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import { Types as DatabaseTypes, database, Database} from '../../database';
import {Scout_Link} from '../../models'
import { types } from '../events';
export const getScouts : ActionCreator<
  ThunkAction<Promise<ScoutActionTypes>, {}, void, AnyAction>
> = () => {
  return async (dispatch: ThunkDispatch<{}, {}, any>): Promise<ScoutActionTypes> => {

    const scouts = await database().FetchLocalDB<ScoutData>(DatabaseTypes.Collections.scout);

    return dispatch({
      type : GET_SCOUTS,
      scouts
    })

  }
}

export const addScout : ActionCreator<
  ThunkAction<Promise<ScoutActionTypes>, {}, void, AnyAction>
> = ({scout, document_refs} : {scout : ScoutData, document_refs : string[]}) => {
  return async (dispatch: ThunkDispatch<{}, {}, any>): Promise<ScoutActionTypes> => {
    const result = await database().AddData(scout);
    document_refs.forEach(ref => database().AddData<Scout_Link>({
      DOCUMENT_TYPE : Database.Collections.scout_link,
      doc_id : ref,
      scout_id : result.id
    }))
    return dispatch({
      type : ADD_SCOUTS,
    })
  }
}

// export const addScouts = ({scouts} : {scouts : Array<ScoutData>}) :  ThunkAction<ScoutActionTypes, {}, {}, ScoutActionTypes> => (
//   dispatch: Dispatch<ScoutActionTypes>
// ): ScoutActionTypes  => {
//   if(!database)
//   {
//     console.log("Database Undefined") 
//   } else {
//     database().AddData(scouts, DatabaseTypes.Collections.scout)
//   }
//   return dispatch({
//     type: ADD_SCOUTS,
//   })
// }
