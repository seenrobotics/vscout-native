import { Types } from '../database'
export type MatchType = "QUALIFIER" | "R16" | "R8" | "R4" | "R2";

export default interface MatchData extends Types.DocumentData {
    DOCUMENT_TYPE : typeof Types.Collections.match;

    eventId: string;
    blueTeamTop: string;
    blueTeamBottom: string;
    redTeamTop: string;
    redTeamBottom: string;
    blueScore ?: number;
    redScore ?: number;
    type : MatchType;
    time : string;
    matchNumber : number;
    completed : boolean;
    id:number;
}