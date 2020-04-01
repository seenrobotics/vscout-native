/**
 * this file contains types that are pouchdb-specific
 * most of it is copied from @types/pouchdb
 * because it is outdated and strange
 * 
 */
/// <reference types='pouchdb-replication' />

declare module '@craftzdog/pouchdb-replication-react-native' {
    const plugin: PouchDB.Plugin;
    export default plugin;
    
}
