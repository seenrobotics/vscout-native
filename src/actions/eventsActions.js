import {GET_EVENTS} from './types.js';

export const getEvents = () => dispatch => {
  dispatch({
    type: GET_EVENTS,
    payload: ['EventA', 'EventB', 'EventC'],
  });
};
