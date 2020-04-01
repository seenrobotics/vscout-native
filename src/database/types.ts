export const Collections = {
    match : "match",
    event : "event"
} as const;


export type Collection = keyof typeof Collections;

export interface DocumentBase<T> {
    docData : T;
    _id : string;
    updated_at : number;
    type : Collection;   
}

export type Document<T> = PouchDB.Core.ExistingDocument<DocumentBase<T>>;
export type OnDataFn<T> = (entries: Array<Document<T>>) => void;