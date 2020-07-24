import { Types } from '../database'

export default interface EventData {
    DOCUMENT_TYPE : typeof Types.Collections.event;
    id : number;
    eventName: string;
    eventType: string;
    eventDate: string;
    address : string;
    city : string;
    region : string;
    country : string;
    teamsRegistered: number;
    numberOfMatches: number;
    qualificationSpots ?: number;
}
