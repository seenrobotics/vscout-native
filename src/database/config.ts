import {config_database} from '../envars'

export {config_database as default_config} from '../envars'

export interface config 
{
    IP : string,
    username : string, 
    password : string, 
    db : string,
    ports : {
        db : string;
        auth : string;
    }
    offline ?: boolean;
}

export const configToURL = (config : config) => 
{
    const {IP, username, password, db} = config;
    return `http://${username}:${password}@${IP}:${config_database.ports.db}/${db}`;
}

export const databaseConfig = (db : string) => 
{
    return {...config_database, db};
}
export const nameIndex = {UPDATED_AT: 'index-updated_at', TYPE_UPDATED_AT : 'type-update_at'}

export const offlineConfig = (db : string) : config =>
{
    return {
        IP : "",
        username :"",
        password : "",
        db, 
        ports : {
            db : "",
            auth : ""
        },
        offline : true,
    }

}