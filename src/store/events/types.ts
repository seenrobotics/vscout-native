import {Event} from '../../models'
import {error} from '../types'

export const GET_EVENTS = 'GET_EVENTS';
export const ADD_EVENTS = 'ADD_EVENTS';

interface GetEventsAction {
    type : typeof GET_EVENTS,
    events: Event[]
}

interface AddEventsAction {
    type : typeof ADD_EVENTS,
}

export interface EventsState {
    events: Array<Event>
}

export type EventActionTypes = GetEventsAction | AddEventsAction | error.RequestErrorAction;