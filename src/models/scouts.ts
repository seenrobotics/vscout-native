import { Types } from '../database'

export default interface ScoutData extends Types.DocumentData {
    DOCUMENT_TYPE : typeof Types.Collections.scout;
    info ?: string;
}