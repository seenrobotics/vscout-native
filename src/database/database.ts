import PouchDB from './pouchdb'
import PouchCollate from 'pouchdb-collate';
const collate = require("pouchdb-collate");
import { config, configToURL, nameIndex, default_config } from './config'
import 'react-native-get-random-values';
import {v4} from 'uuid';
import {DocumentBase, Document, OnDataFn, Collection} from './types'

export default class Database
{
    LocalDB :  PouchDB.Database<DocumentBase<any>>;
    RemoteDB : PouchDB.Database<DocumentBase<any>>;

    syncing : boolean = false;
    Config : config;
    TAG = () => `Sync ${this.Config.db}`;
    OnData ?: OnDataFn<any>;

    constructor({config} : {config : config}) 
    {
        this.Config = config;
        this.RemoteDB = new PouchDB(configToURL(config));
        this.LocalDB = new PouchDB(config.db,  {adapter: 'react-native-sqlite'});
    }

    Initialize () {
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
        this.LocalDB.on('change', () => {
            console.log("changes yeet");
        })
        this.LocalDB.changes({
            live: true,
            since : 'now'
        }).on("change", (info) => {
            console.log("freet");
            // info.doc ? 
            //     this.ReloadLocalDB(info.doc.type) : false;            
        })
        console.log('after sync');
    }

    AddData<DataType>(data : Array<DataType>, type : Collection) {
        // console.log(PouchCollate.toIndexableString([
        //     type, "asdf", "awefwef"
        // ]).replace(/\u0000/g, '\u0001'));
        // console.log('hi');
        // const yeet = PouchCollate.toIndexableString([
        //     'sadf', 'asdf ', 'asdf'
        // ])
        // console.log(PouchCollate);
        console.log({collate});
        // console.log({yeet});
        data.forEach(DocData => {
           
            const entry = {
                _id : collate.toIndexableString([
                    type, v4(),
                ]).replace(/\u0000/g, '\u0001'),
                DocData,
                updated_at : Date.now(),
                type
            }
            this.LocalDB
                .put(entry)
                .then(response => {
                    if (response.ok) {
                        console.log(this.TAG(), response)
                        // Toast.show('Add new note success')
                        // this.handleBackPress()
                    } else {
                        console.log(this.TAG(), "add new note fail")
                        // Toast.show('Add new note fail')
                        // this.setState({isLoading: false})
                    }
                })
                .catch(err => {
                    console.log(this.TAG(), err)
                    // Toast.show(err.message)
                    // this.setState({isLoading: false})
                })
        })
    }

    queryRequestParams = <T>(type : Collection) : PouchDB.Find.FindRequest<DocumentBase<T>> => {
        console.log({type});
        return {
            selector : {
                type : {$eq : type},
                updated_at: {$gt: true}
            },
            fields: ['_id', 'DocData', 'updated_at', 'type'],
            use_index: nameIndex.TYPE_UPDATED_AT,
            // sort: ["updated_at"]
        }
    }

    async FetchLocalDB<DocumentData>(type : Collection) : 
    Promise<PouchDB.Core.ExistingDocument<DocumentBase<DocumentData>>[]>{
        console.log(this.queryRequestParams<DocumentData>(type));
        try {
            const { docs } = await this.LocalDB.find(this.queryRequestParams<DocumentData>(type));
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
            fields: ['_id', 'DocData', 'updated_at', 'type'],
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

export const database = new Database({ config : default_config });
database.Sync();