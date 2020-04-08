export const Collections = {
    match : "match",
    event : "event"
} as const;

export type Collection = keyof typeof Collections;

export interface DocumentData {
    DOCUMENT_TYPE : Collection
}

export interface DocumentBase<T extends DocumentData> {
    docData : T;
    _id : string;
    updated_at : number;
    type : Collection;   
}

export type Document<T extends DocumentData> = PouchDB.Core.ExistingDocument<DocumentBase<T>>;
export type OnDataFn<T extends DocumentData> = (entries: Array<Document<T>>) => void;