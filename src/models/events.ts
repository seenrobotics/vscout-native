import { Types } from '../database'

export default interface EventData {
    DOCUMENT_TYPE : typeof Types.Collections.event;

    eventName: string;
    eventType: string;
    eventDate: string;
    venue: string;
    address : string;
    city : string;
    region : string;
    country : string;
    teamsRegistered: number;
    numberOfMatches: number;
    qualificationSpots ?: number;
    qualifiesFor : string;
}
