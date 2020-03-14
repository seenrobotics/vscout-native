import * as mocks from '../mocks';
import {bindActionCreators, Dispatch} from 'redux';
import {GET_EVENTS} from './types.js';

export const  getEvents = () => (dispatch: Dispatch) => {
  dispatch({
    type: GET_EVENTS,
    payload: mocks.events,
  });
};
