export const default_config : config = {
    IP : "167.99.184.96",
    username : "admin",
    password : 'li',
    db : 'events',
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

export const nameIndex = {UPDATED_AT: 'index-updated_at'}

export const defaultConfigURL = () => configToURL(default_config);