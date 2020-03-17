export const REQUEST_ERROR = 'REQUEST_ERROR';
    export interface RequestErrorAction {
        type: typeof REQUEST_ERROR,
        error : any;
    }