export const GET_EVENTS = 'GET_EVENTS';

export interface Event {
    id: number;
    eventName: string;
    eventType: string;
    eventDate: string;
    eventLocation: string;
  }

interface GetEventsAction {
    type : typeof GET_EVENTS,
    events: Event[]
}

export interface EventsState {
    events: Array<Event>
}

export type EventActionTypes = GetEventsAction;