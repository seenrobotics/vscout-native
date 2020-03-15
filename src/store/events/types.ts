export const GET_EVENTS = 'GET_EVENTS';

export interface Event {
    id: number;
    eventName: string;
    eventType: string;
    eventDate: string;
  }

interface GetEventsAction {
    type : typeof GET_EVENTS,
    payload: {
        events: Event[]
    }
}

export interface EventsState {
    events: Array<Event>
}

export type EventActionTypes = GetEventsAction;