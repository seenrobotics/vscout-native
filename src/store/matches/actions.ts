import {Match} from '../../models'
import {GET_MATCHES, MatchActionTypes} from './types'
import {error as Error} from '../types'
import {bindActionCreators, Dispatch, AnyAction, ActionCreator} from 'redux';
import {GetData} from '../../services';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import realm from '../../realm';

export const getMatches = (): ThunkAction<MatchActionTypes, {}, {}, AnyAction> => (
  dispatch: Dispatch,
): MatchActionTypes => {
  const matches = realm.objects<Match>("Match").map(realmObject => ({
    ...realmObject
  }))
  return dispatch({
    type: GET_MATCHES,
    matches,
  });
};

export const loadMatches : ActionCreator<
  ThunkAction<Promise<MatchActionTypes>, {}, void, AnyAction>
> = () => {
  return async (dispatch: ThunkDispatch<{}, {}, any>): Promise<MatchActionTypes> => {
    let matches : Match[] = []
    try {
      matches = await GetData.Matches();
      // const text = await Api.call();
    } catch (error) {
      return dispatch({
        type : Error.REQUEST_ERROR,
        error
      })
    }
    realm.write(() => {
      realm.delete(realm.objects('Match'));
      matches.forEach(match => {
        realm.create('Match', {
          ...match
        })
      })
    })
    return dispatch({
      type: GET_MATCHES,
      matches
    });
  };
};