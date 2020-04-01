export const GET_EVENTS = 'GET_EVENTS';
export const SYNC_EVENTS = 'SYNC_EVENTS';
export const CLOSE_SYNC = 'CLOSE_SYNC';



export interface Event {
    _id: number;
    eventName: string;
    eventType: string;
    eventDate: string;
}

interface GetEventsAction {
    type : typeof GET_EVENTS,
    events: Event[]
}

interface SyncEventsAction {
    type : typeof SYNC_EVENTS,
}

interface CloseSyncAction {
    type : typeof CLOSE_SYNC,
    // message : string,
}

export interface EventsState {
    events: Array<Event>,
    isSync : Boolean,
}

export type EventActionTypes = GetEventsAction | SyncEventsAction | CloseSyncAction;