import PouchDB from './pouchdb'
import PouchCollate from 'pouchdb-collate';
const collate = require("pouchdb-collate");
import { config, configToURL, nameIndex, default_config, offlineConfig } from './config'
import 'react-native-get-random-values';
import {v4} from 'uuid';
import {DocumentBase, DocumentData, OnDataFn, Collection, Collections} from './types'
import Utils from './utils';

export interface Subscription<T extends DocumentData> {
    id : number;
    docType : T['DOCUMENT_TYPE'];
    callbackFn : (change : PouchDB.Core.ChangesResponseChange<DocumentBase<T>>) => any;
    unsubscribe : () => void;
}

export default class Database
{
    static Utils = Utils;
    public static Collections = Collections;
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

    static initialize = (config : config, sync = true) => {

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

    private unsubscribe = (id: number) =>  () => delete this.subscriptions[id];

    subscribe<T extends DocumentData> (docType : T['DOCUMENT_TYPE'], callbackFn : (change : PouchDB.Core.ChangesResponseChange<DocumentBase<T>>) => void) {
        console.log("subscribe", {subscriptions : this.numberSubscriptions});
        this.numberSubscriptions++;
        const subscription = {docType, callbackFn, id : this.numberSubscriptions, unsubscribe : this.unsubscribe(this.numberSubscriptions)};
        this.subscriptions[this.numberSubscriptions] = subscription;
        return subscription;
    }
    private numberSubscriptions = 0;
    private subscriptions : {[index : number] : Subscription<any>} = [];

    syncCallbackFn = () => {};
    private constructor(config : config) 
    {
        this.syncCallbackFn = config.syncCallbackFn || (() => {});
        this.Config = config;
        this.LocalDB = new PouchDB(config.db,  {adapter: 'react-native-sqlite'});
        console.log({config});
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
        console.log("syncing")
        this.RemoteDB.changes({
            live : true,
            since : "now",
            include_docs : true
        }).then((change) => {
            const type = change.results[0].doc?.type;
            Object.entries(this.subscriptions).forEach(([key, value]) => {
                if(type == value.docType)
                {
                    value.callbackFn(change.results[0]);
                }
            })
        })

        let handlerSync = PouchDB.sync(this.LocalDB, this.RemoteDB, {
            live: true,
            retry: true,
        })
            .on('change', (info) => {
                // console.log(this.TAG(), 'onChange', info)
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

    public async AddData<DataType extends DocumentData>(docData : DataType) {
        const document = {
            _id : collate.toIndexableString([
                docData.DOCUMENT_TYPE, v4(),
            ]).replace(/\u0000/g, '\u0001'),
            docData,
            updated_at : Date.now(),
            type : docData.DOCUMENT_TYPE
        }
        const result = await this.LocalDB.put(document);
        return result;
    }

    async BulkAddData<DataType extends DocumentData>(data : Array<DataType>) {
        const results = data.map(d => this.AddData(d));
        return await Promise.all(results);
    }


    async FetchLocalDB<DocData extends DocumentData>(type : Collection) : 
    Promise<PouchDB.Core.ExistingDocument<DocumentBase<DocData>>[]>{

        console.log(Database.Utils.queryRequestParams<DocData>(type));
        try {
            const {docs} = await this.LocalDB.find(Database.Utils.queryRequestParams<DocData>(type));
            console.log(`FETCH LOCAL DB: found ${docs.length} ${type}`)
            // console.log({docs});
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
Database.initialize_offline("vscout-2381"); 
// This is for debugging otherwise when the app reloads when code updates it will error database
// not initialized. During normal use, user shouldn't be able to reload the database independently of reloading the app.
// If that is not the case, this needs to rewritten and fixed.
export const database = Database.reference;