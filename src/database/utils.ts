import {DocumentBase, DocumentData, OnDataFn, Collection} from './types'
import { config, configToURL, nameIndex, default_config } from './config'
import axios from "axios";
export default {
    queryRequestParams :  <T extends DocumentData>(type : Collection) : PouchDB.Find.FindRequest<DocumentBase<T>> => {
        return {
            selector : {
                type : {$eq : type},
                updated_at: {$gt: true}
            },
            fields: ['_id', 'docData', 'updated_at', 'type'],
            use_index: nameIndex.TYPE_UPDATED_AT,
        }
    },
    auth_database : async (config : config, {token, password} : {token : string, password : string}) => {
        const sessionUrl = `http://${config.IP}:${config.ports.db}/_session`;
        const sessionConfig = {
          username : token,
          password : password
        }
        console.log({sessionConfig, sessionUrl});
        const confirm_session = await axios.get(sessionUrl,{auth : sessionConfig}) 
        return confirm_session
      }

}