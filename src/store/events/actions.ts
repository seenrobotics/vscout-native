import {Event, GET_EVENTS, ADD_EVENTS, INIT_EVENTS_DB,  DB_EXISTS, EventActionTypes, EventsState} from './types'
import {bindActionCreators, Dispatch, AnyAction,  } from 'redux';
import {ThunkAction,} from 'redux-thunk';
import { Database, Types as DatabaseTypes, config} from '../../database';
import { databaseConfig } from '../../database/config';


export const initializeDatabase = (): ThunkAction<EventActionTypes, EventsState, {}, EventActionTypes> => (
  dispatch: Dispatch<EventActionTypes>, getState : () => EventsState
): EventActionTypes => {

  if(getState().database)
  {
    return dispatch({
      type : DB_EXISTS,
      message : "Events Database Already Created"
    })
  }

  const config =  databaseConfig('events');
  const OnData  = (docs : Array<DatabaseTypes.Document<Event>>) => {
    // Tell The Store About the data
    dispatch({
      type: GET_EVENTS,
      events : docs.filter(dbEntry => dbEntry.DocData).map(({DocData, _id}) => { 
        return {...DocData, _id}
      })
    })
  }
  
  const database = new Database<Event>({config, OnData});
  database.Sync();
  return dispatch({
    type: INIT_EVENTS_DB,
    database
  });
};

export const addEvents = ({events} : {events : Array<Event>}) :  ThunkAction<EventActionTypes, EventsState, {}, EventActionTypes> => (
  dispatch: Dispatch<EventActionTypes>, getState : () => EventsState
): EventActionTypes => {
  const database = getState().database;
  if(!database)
  {
    console.log("Database Undefined") 
  } else {
    database.AddData(events)
  }
  return dispatch({
    type: ADD_EVENTS,
  })
}
