import PouchDB from './pouchdb'
import { config, configToURL, nameIndex } from './config'

import {DocumentBase, Document, OnDataFn} from './types'
export default class Database<T>
{
    LocalDB :  PouchDB.Database<DocumentBase<T>>;
    RemoteDB : PouchDB.Database<DocumentBase<T>>;

    syncing : boolean = false;
    Config : config;
    TAG = () => `Sync ${this.Config.db}`;
    OnData : OnDataFn<T>;

    constructor({config , OnData} : {config : config, OnData : OnDataFn<T>}) 
    {
        this.OnData = OnData;
        this.Config = config;
        this.RemoteDB = new PouchDB(configToURL(config));
        this.LocalDB = new PouchDB(config.db,  {adapter: 'react-native-sqlite'});
    }

    Initialize () {
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
                this.ReloadLocalDB();
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
        console.log('after sync');
    }

    AddData(data : Array<T>) {
        data.forEach(DocData => {
            const entry = {
                DocData,
                updated_at : Date.now(),
            }
            this.LocalDB
                .post(entry)
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

    ReloadLocalDB() {
        this.LocalDB
        .find({
            selector: {
                updated_at: {$gt: true}
            },
            fields: ['_id', 'DocData', 'updated_at'],
            use_index: nameIndex.UPDATED_AT,
            sort: [{updated_at: 'desc'}]
        })
        .then(result => {
            console.log(this.TAG(), 'FetchLocalDB', result);
            this.OnData(result.docs);
        })
        .catch(err => {
            console.log(this.TAG(), 'err FetchLocalDB', err)
            // this.setState({isLoading: false})
            // Toast.show(err.message)
        })
    }
}