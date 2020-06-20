import {EventData, GET_EVENTS, ADD_EVENTS, EventActionTypes, EventsState, EventDoc} from './types'
import { Dispatch, AnyAction, ActionCreator } from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import { Types as DatabaseTypes, database} from '../../database';

export const getEvents : ActionCreator<
  ThunkAction<Promise<EventActionTypes>, {}, void, AnyAction>
> = () => {
  return async (dispatch: ThunkDispatch<{}, {}, any>): Promise<EventActionTypes> => {

    const events = await database().FetchLocalDB<EventData>(DatabaseTypes.Collections.event);
    const subscription = database().subscribe<EventData>("event", async (change) => {
      const events = await database().FetchLocalDB<EventData>(DatabaseTypes.Collections.event);
      dispatch({
        type : GET_EVENTS,
        events,
      });
    });
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
    database().BulkAddData(events)
  }
  return dispatch({
    type: ADD_EVENTS,
  })
}
