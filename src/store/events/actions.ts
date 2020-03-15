import {Event, GET_EVENTS, EventActionTypes} from './types'
import {bindActionCreators, Dispatch} from 'redux';
import * as mocks from '../../mocks';

export const getEvents = () => (dispatch: Dispatch) => {
    dispatch({
      type: GET_EVENTS,
      payload: {
        events: Array.from(mocks.events)
      },
    });
};