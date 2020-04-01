import {Event, GET_EVENTS, SYNC_EVENTS, CLOSE_SYNC,  EventActionTypes, EventsState} from './types'
import {bindActionCreators, Dispatch, AnyAction,  } from 'redux';
import {syncDb} from '../../services/sync'
import * as mocks from '../../mocks';
import {ThunkAction,} from 'redux-thunk';
import { isOfType } from 'typesafe-actions';

// export const getEvents = (): ThunkAction<EventActionTypes, {}, {}, AnyAction> => (
//   dispatch: Dispatch,
// ): EventActionTypes => {
//   return dispatch({
//     type: GET_EVENTS,
//     events: mocks.events,
//   });
// };

const safeCastToEvent  = (object : any) => {
  try {
    return <Event>object;
  } 
  catch {
    console.error(`${object} is not of type Event`)
  }
}

export const syncEvents = (): ThunkAction<EventActionTypes, EventsState, {}, AnyAction> => (
  dispatch: Dispatch, getState : () => EventsState
): EventActionTypes => {
  if(!getState().isSync){
    syncDb({
      onData : (data) => {
      dispatch({
        type: GET_EVENTS,
        events : data.filter(dbEntry => dbEntry.eventData).map(({eventData, _id}) => { 
          // console.log({eventData});
          return {...eventData, _id}
        })});
    },
    onClose : () => {
      dispatch({
        type: CLOSE_SYNC,
      })
    }});
  } else 
  {
    console.log("Already Syncing")
  }
  return dispatch({
    type: SYNC_EVENTS,
  });
};