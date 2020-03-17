import {Event, GET_EVENTS, EventActionTypes, ADD_EVENTS} from './types'
import {bindActionCreators, Dispatch, AnyAction} from 'redux';
import * as mocks from '../../mocks';
import {ThunkAction} from 'redux-thunk';
import realm from '../../realm';

export const getEvents = (): ThunkAction<EventActionTypes, {}, {}, AnyAction> => (
  dispatch: Dispatch,
): EventActionTypes => {
  const events = realm.objects<Event>("Event").map(realmObject => ({
    ...realmObject
  }))
  return dispatch({
    type: GET_EVENTS,
    events: events,
  });
};

export const addEvents = (): ThunkAction<EventActionTypes, {}, {}, AnyAction> => (
  dispatch: Dispatch,
): EventActionTypes => {
  realm.write(()=> {
    realm.create('Event', mocks.events[0]);
  })
  return dispatch({
    type: ADD_EVENTS
  });
};