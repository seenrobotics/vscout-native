import {Match, GET_MATCHES, MatchActionTypes} from './types'
import {bindActionCreators, Dispatch, AnyAction} from 'redux';
import * as mocks from '../../mocks';
import {ThunkAction} from 'redux-thunk';

export const getMatches = (): ThunkAction<MatchActionTypes, {}, {}, AnyAction> => (
  dispatch: Dispatch,
): MatchActionTypes => {
  return dispatch({
    type: GET_MATCHES,
    matches: mocks.matches,
  });
};