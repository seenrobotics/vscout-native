import { Types } from '../database'

export default interface ScoutData extends Types.DocumentData {
    DOCUMENT_TYPE : typeof Types.Collections.scout_link;
    scout_id : string;
    doc_id : string; 
}