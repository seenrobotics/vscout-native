export const GET_EVENTS = 'GET_EVENTS';
export const ADD_EVENTS = 'ADD_EVENTS';


export interface Event {
    id: number;
    eventName: string;
    eventType: string;
    eventDate: string;
}

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

export type EventActionTypes = GetEventsAction | AddEventsAction;