import {Action} from '../actions/types';
export interface Matches {
  matches: Array<any>;
}

const initialState: Matches = {
  matches: [],
};

export default function(
  state: Matches = initialState,
  action: Action,
): Matches {
  console.log('Action: ' + action.type);
  switch (action.type) {
    case 'GET_MATCHES':
      return {
        ...state,
        matches: action.matches,
      };
    default:
      return state;
  }
}
