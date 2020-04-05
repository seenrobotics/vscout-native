import {EventData, GET_EVENTS, ADD_EVENTS, INIT_EVENTS_DB,  DB_EXISTS, EventActionTypes, EventsState} from './types'
import {bindActionCreators, Dispatch, AnyAction, ActionCreator } from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import { Types as DatabaseTypes, database, Database} from '../../database';
import { databaseConfig } from '../../database/config';
import { matches  as altEvents} from '../../mocks'
export const getEvents : ActionCreator<
  ThunkAction<Promise<EventActionTypes>, {}, void, AnyAction>
> = () => {
  return async (dispatch: ThunkDispatch<{}, {}, any>): Promise<EventActionTypes> => {

    const events = await database.FetchLocalDB<EventData>(DatabaseTypes.Collections.event);
    return dispatch({
      type : GET_EVENTS,
      events
    })

  }
}

export const addEvents = ({events} : {events : Array<EventData>}) :  ThunkAction<EventActionTypes, EventsState, {}, EventActionTypes> => (
  dispatch: Dispatch<EventActionTypes>, getState : () => EventsState
): EventActionTypes => {

  if(!database)
  {
    console.log("Database Undefined") 
  } else {
    database.AddData(altEvents, DatabaseTypes.Collections.match)
  }
  return dispatch({
    type: ADD_EVENTS,
  })
}
