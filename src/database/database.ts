import PouchDB from './pouchdb'
import PouchCollate from 'pouchdb-collate';
const collate = require("pouchdb-collate");
import { config, configToURL, nameIndex, default_config, offlineConfig } from './config'
import 'react-native-get-random-values';
import {v4} from 'uuid';
import {DocumentBase, DocumentData, OnDataFn, Collection} from './types'
import Utils from './utils';

export default class Database
{
    static Utils = Utils;
    LocalDB :  PouchDB.Database<DocumentBase<any>>;
    RemoteDB : PouchDB.Database<DocumentBase<any>>;

    syncing : boolean = false;

    Config : config;
    TAG = () => `Sync ${this.Config.db}`;
    OnData ?: OnDataFn<any>;
    static instance ?: Database; 
    static reference = () => {

        if(Database.instance)
        {
            return Database.instance;
        }
        console.trace("db not initialized");
        throw "Database Not Initialized";
    }
    static initialize = (config : config, sync = false) => {
        Database.instance = new Database(config);
        if(sync)
        {
            Database.instance.Sync();
        }
        return Database.instance;
    }
    static initialize_offline = (db : string) => {
        Database.instance = new Database(offlineConfig(db));
        return Database.instance;
    }
  
    private constructor(config : config) 
    {

        this.Config = config;
        this.LocalDB = new PouchDB(config.db,  {adapter: 'react-native-sqlite'});
        if(config.offline)
        {
            this.RemoteDB = this.LocalDB;

        } else {
            this.RemoteDB = new PouchDB(configToURL(config));
        }
    }

    Initialize_Index () {
        this.RemoteDB.createIndex({
            index: {
                fields: ['type', 'updated_at'],
                name: nameIndex.TYPE_UPDATED_AT,
                ddoc: nameIndex.TYPE_UPDATED_AT,
            }
        }).then((result) => {
            console.log(result)
        }).catch((err) => {
            console.log(Object.getOwnPropertyNames(err), err)
        })
        this.RemoteDB.createIndex({
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
    
    Sync() {
        if(this.Config.offline)
        {
            console.log("OFFLINE DATABASE CANNOT SYNC")
            return;
        }
        if(this.syncing)
        {
            console.log("already syncing");
            return;
        }
        this.syncing = true;
        let handlerSync = PouchDB.sync(this.LocalDB, this.RemoteDB, {
            live: true,
            retry: true,
        })
            .on('change', (info) => {
                console.log(this.TAG(), 'onChange', info)
            })
            .on('paused', (err) => {
                console.log(this.TAG(), 'onPaused', err)
            })
            .on('active', () => {
                console.log(this.TAG(), 'onActive')
            })
            .on('denied', (err) => {
                console.log(this.TAG(), 'onDenied', err)
            })
            .on('complete', (info) => {
                this.syncing = false;
                console.log(this.TAG(), 'onComplete', info)
            })
            .on('error', (err) => {
                this.syncing = false;
                console.log(this.TAG(), 'onError', err)
            })
    }

    AddData<DataType>(data : Array<DataType>, type : Collection) {
        data.forEach(docData => {
           
            const entry = {
                _id : collate.toIndexableString([
                    type, v4(),
                ]).replace(/\u0000/g, '\u0001'),
                docData,
                updated_at : Date.now(),
                type
            }
            this.LocalDB
                .put(entry)
                .then(response => {
                    if (response.ok) {
                        console.log(this.TAG(), response)
                    } else {
                        console.log(this.TAG(), "add new doc fail")
                    }
                })
                .catch(err => {
                    console.log(this.TAG(), err)
                })
        })
    }


    async FetchLocalDB<DocData extends DocumentData>(type : Collection) : 
    Promise<PouchDB.Core.ExistingDocument<DocumentBase<DocData>>[]>{
       
        console.log(Database.Utils.queryRequestParams<DocData>(type));
        try {
            const { docs } = await this.LocalDB.find(Database.Utils.queryRequestParams<DocData>(type));
            console.log({docs});
            return docs;
            
        }   catch (err) {

            console.log(err);
            return [];
        }
    }
    ReloadLocalDB(type : Collection) {
        // TODO : Make this function async instead of promise resolve
        this.LocalDB
        .find({
            selector: {
                type,
                updated_at: {$gt: true}
            },
            fields: ['_id', 'docData', 'updated_at', 'type'],
            use_index: nameIndex.TYPE_UPDATED_AT,
            sort: [{updated_at: 'desc'}]
        })
        .then(result => {
            console.log(this.TAG(), 'FetchLocalDB', result);
            this.OnData ? this.OnData(result.docs) : false;
        })
        .catch(err => {
            console.log(this.TAG(), 'err FetchLocalDB', err)
        })
    }
}

export const database = Database.reference;