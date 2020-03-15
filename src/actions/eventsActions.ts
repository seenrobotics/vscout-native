import * as mocks from '../mocks';
import {AnyAction, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {Action} from './types';

export const getEvents = (): ThunkAction<Action, {}, {}, AnyAction> => (
  dispatch: Dispatch,
): Action => {
  return dispatch({
    type: 'GET_EVENTS',
    events: mocks.events,
  });
};
