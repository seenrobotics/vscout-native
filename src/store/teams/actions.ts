import {TeamData, GET_TEAMS, ADD_TEAMS, TeamActionTypes, TeamsState} from './types'
import { Dispatch, AnyAction, ActionCreator } from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import { Types as DatabaseTypes, database} from '../../database';

export const getTeams : ActionCreator<
  ThunkAction<Promise<TeamActionTypes>, {}, void, AnyAction>
> = () => {
  return async (dispatch: ThunkDispatch<{}, {}, any>): Promise<TeamActionTypes> => {

    const teams = await database().FetchLocalDB<TeamData>(DatabaseTypes.Collections.team);
    return dispatch({
      type : GET_TEAMS,
      teams
    })

  }
}

export const addTeams = ({teams} : {teams : Array<TeamData>}) :  ThunkAction<TeamActionTypes, TeamsState, {}, TeamActionTypes> => (
  dispatch: Dispatch<TeamActionTypes>, getState : () => TeamsState
): TeamActionTypes => {

  if(!database())
  {
    console.log("Database Undefined") 
  } else {
    database().AddData(teams, DatabaseTypes.Collections.team)
  }
  return dispatch({
    type: ADD_TEAMS,
  })
}
