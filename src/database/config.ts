export const default_config  = {
    IP : "167.99.184.96",
    username : "admin",
    password : 'li',
}

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
export const nameIndex = {UPDATED_AT: 'index-updated_at'}