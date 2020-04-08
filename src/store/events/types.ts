import { Types } from '../../database'

export const GET_EVENTS = 'GET_EVENTS';
export const ADD_EVENTS = 'ADD_EVENTS';

export interface EventData {
    eventName: string;
    eventType: string;
    eventDate: string;
    venue: string;
    address : string;
    city : string;
    region : string;
    country : string;
    teamsRegistered: number;
    qualMatches: number;
}

export type EventDoc = Types.DocumentBase<EventData>

interface GetEventsAction {
    type : typeof GET_EVENTS;
    events: Array<EventDoc>;
}

interface AddEventsAction {
    type : typeof ADD_EVENTS,
}

export interface EventsState {
    events: Array<EventDoc>;
}

export type EventActionTypes = GetEventsAction | AddEventsAction;