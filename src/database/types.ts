export interface DocumentBase<T> {
    DocData : T;
}
export type Document<T> = PouchDB.Core.ExistingDocument<DocumentBase<T>>;
export type OnDataFn<T> = (entries: Array<Document<T>>) => void;
