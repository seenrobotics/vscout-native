/**
 * this file contains types that are pouchdb-specific
 * most of it is copied from @types/pouchdb
 * because it is outdated and strange
 * 
 */
/// <reference types='pouchdb-replication' />

declare module 'react-native-sqlite-2' {
    
}

declare module 'pouchdb-adapter-react-native-sqlite' {
    const SqliteAdapter : ( a : any) => PouchDB.Plugin;
    export default SqliteAdapter;
}