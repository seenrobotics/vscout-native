import {Event} from '../../models'
import {GET_EVENTS, EventActionTypes, ADD_EVENTS} from './types'
import {error as Error} from '../types'
import {bindActionCreators, Dispatch, AnyAction, ActionCreator} from 'redux';
import {GetData} from '../../services';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
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

export const loadEvents : ActionCreator<
  ThunkAction<Promise<EventActionTypes>, {}, void, AnyAction>
> = () => {
  return async (dispatch: ThunkDispatch<{}, {}, any>): Promise<EventActionTypes> => {
    let events : Event[] = []
    try {
      events = await GetData.Events();
      // const text = await Api.call();
    } catch (error) {
      return dispatch({
        type : Error.REQUEST_ERROR,
        error
      })
    }
    realm.write(() => {
      realm.delete(realm.objects('Event'));
      events.forEach(event => {
        realm.create('Event', {
          ...event
        })
      })
    })
    return dispatch({
      type: GET_EVENTS,
      events
    });
  };
};
