/**
 * this file contains types that are pouchdb-specific
 * most of it is copied from @types/pouchdb
 * because it is outdated and strange
 * 
 */
/// <reference types='pouchdb-core' />

declare module '@craftzdog/pouchdb-core-react-native' {
    
    const PouchDB: PouchDB.Static;
    export default PouchDB;
    
}
declare var PouchDB: PouchDB.Static;
