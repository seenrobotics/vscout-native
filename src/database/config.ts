import {default_config} from '../envars'

export {default_config} from '../envars'

export interface config 
{
    IP : string,
    username : string, 
    password : string, 
    db : string,
}

export const configToURL = (config : config) => 
{
    const {IP, username, password, db} = config;
    return `http://${username}:${password}@${IP}:5984/${db}`;
}

export const databaseConfig = (db : string) => 
{
    return {...default_config, db};
}
export const nameIndex = {UPDATED_AT: 'index-updated_at', TYPE_UPDATED_AT : 'type-update_at'}
