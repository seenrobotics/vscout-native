import {Action} from '../actions/types';
export interface Events {
  events: Array<any>;
}

const initialState: Events = {
  events: [],
};

export default function(state: Events = initialState, action: Action): Events {
  console.log('Action: ' + action.type);
  switch (action.type) {
    case 'GET_EVENTS':
      return {
        ...state,
        events: action.events,
      };
    default:
      return state;
  }
}
