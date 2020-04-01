import PouchDB from './pouchdb'
import {events} from '../mocks';
import {nameIndex, defaultConfigURL, default_config} from './config'

export const remoteNoteDb = new PouchDB(defaultConfigURL());
export const localNoteDb = new PouchDB(default_config.db, {adapter: 'react-native-sqlite'})

export function doSomething()  {
    remoteNoteDb.createIndex({
        index: {
            fields: ['updated_at'],
            name: nameIndex.UPDATED_AT,
            ddoc: nameIndex.UPDATED_AT,
        }
    }).then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(Object.getOwnPropertyNames(err), err)
    })
}
const TAG = "pouchdb.instance.js"

export const syncDb = () => {
    // this.setState({isLoading: true})
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
                getListNoteFromDb()
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

export const getListNoteFromDb = () => {
    // this.setState({isLoading: true})
    console.log({PouchDB})
    localNoteDb
        .find({
            selector: {
                updated_at: {$gt: true}
            },
            fields: ['_id', 'title', 'updated_at'],
            use_index: nameIndex.UPDATED_AT,
            sort: [{updated_at: 'desc'}]
        })
        .then(result => {
            console.log(TAG, 'getListNoteFromDb', result)
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

export const onSaveNotePress = () => {
    
    events.forEach(event => {
        const eventData = Object.assign({...event});
        delete eventData.id;
        const entry = {
            eventData, updated_at : Date.now()
        }
        localNoteDb
            .post(entry)
            .then(response => {
                if (response.ok) {
                    console.log(response)
                    // Toast.show('Add new note success')
                    // this.handleBackPress()
                } else {
                    console.log("add new note fail")
                    // Toast.show('Add new note fail')
                    // this.setState({isLoading: false})
                }
            })
            .catch(err => {
                console.log(TAG, err)
                // Toast.show(err.message)
                // this.setState({isLoading: false})
            })

    })
    
}