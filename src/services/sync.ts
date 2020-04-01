import {localNoteDb, remoteNoteDb, config, PouchDB} from '../database'
import {bindActionCreators, Dispatch, AnyAction} from 'redux';
import {events as eventTypes} from '../store/types'

const TAG = "Sync.ts"

export const syncDb = ({onData, onClose } : { onData : (data : Array<any>) =>  any, onClose : () => any}) => {
    // this.setState({isLoading: true}
    // console.log({PouchDB});
    let handlerSync = PouchDB.sync(remoteNoteDb, localNoteDb, {
        live: true,
        retry: true,
    })
        .on('change', (info) => {
            console.log(TAG, 'sync onChange', info)
        })
        .on('paused', (err) => {
            console.log(TAG, 'sync onPaused', err)
            // if (this.isAtCurrentScreen) {
                getListNoteFromDb(onData)
            // }
        })
        .on('active', () => {
            console.log(TAG, 'sync onActive')
        })
        .on('denied', (err) => {
            console.log(TAG, 'sync onDenied', err)
        })
        .on('complete', (info) => {
            console.log(TAG, 'sync onComplete', info)
        })
        .on('error', (err) => {
            console.log(TAG, 'sync onError', err)
        })
}

export const getListNoteFromDb = (onData : (data : Array<any>) =>  any) => {
    // this.setState({isLoading: true})
    localNoteDb
        .find({
            selector: {
                updated_at: {$gt: true}
            },
            fields: ['_id', 'eventData', 'updated_at'],
            use_index: config.nameIndex.UPDATED_AT,
            sort: [{updated_at: 'desc'}]
        })
        .then(result => {
            console.log(TAG, 'getListNoteFromDb', result)
            onData(result.docs);
            result.docs;
            // this.setState({
            //     isLoading: false,
            //     arrNote: [...result.docs]
            // })
        })
        .catch(err => {
            console.log(TAG, 'err getListNoteFromDb', err)
            // this.setState({isLoading: false})
            // Toast.show(err.message)
        })
}
