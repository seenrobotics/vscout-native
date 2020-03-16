import {Event, GET_EVENTS, EventActionTypes} from './types'
import {bindActionCreators, Dispatch, AnyAction} from 'redux';
import * as mocks from '../../mocks';
import {ThunkAction} from 'redux-thunk';

export const getEvents = (): ThunkAction<EventActionTypes, {}, {}, AnyAction> => (
  dispatch: Dispatch,
): EventActionTypes => {
  return dispatch({
    type: GET_EVENTS,
    events: mocks.events,
  });
};