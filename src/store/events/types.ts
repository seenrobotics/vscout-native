import DB from '../../database/database'

export const GET_EVENTS = 'GET_EVENTS';
export const INIT_EVENTS_DB = 'INIT_EVENTS_DB';
export const DB_EXISTS = 'DB_EXISTS';
export const ADD_EVENTS = 'ADD_EVENTS';


export interface Event {
    _id: string;
    eventName: string;
    eventType: string;
    eventDate: string;
}

interface GetEventsAction {
    type : typeof GET_EVENTS;
    events: Array<Event>;
}

interface AddEventsAction {
    type : typeof ADD_EVENTS,
}

interface InitEventsDBAction {
    type : typeof INIT_EVENTS_DB;
    database : DB<Event>;
}

interface DBExistsAction {
    type : typeof DB_EXISTS;
    message ?: string;
}

export interface EventsState {
    events: Array<Event>;
    database ?: DB<Event>;
}

export type EventActionTypes = GetEventsAction | InitEventsDBAction | DBExistsAction | AddEventsAction;