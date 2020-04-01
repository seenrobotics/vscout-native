import * as config from './config'
import {remoteNoteDb, localNoteDb} from './pouchdb.instance'
import PouchDB from './pouchdb'
export {
    config, 
    remoteNoteDb,
    localNoteDb,
    PouchDB
}