import * as config from './config'
import {database, default as Database} from './database';
import * as Types from './types';
import PouchDB from './pouchdb'
export {
    Database,
    database,
    Types,
    config, 
    PouchDB
}