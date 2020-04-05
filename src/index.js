/**
 * @format
 */

import PouchdbConfig from './database/pouchdb.config';



import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// for handling swipe guestures
import { gestureHandlerRootHOC } from 'react-native-gesture-handler' 


AppRegistry.registerComponent(appName, () => App);
// swipe guestures
AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
