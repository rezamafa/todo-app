// MongoDB Server Configuration:
const conf = {
    host: "127.0.0.1",
    port: "27017",
    username: "admin",
    password: "root",
    dbName: "test2db"
};
const uri = `mongodb://${conf.username}:${conf.password}@${conf.host}:${conf.port}/${conf.dbName}?retryWrites=true&w=majority`;
export const dbUrl =  { url: uri };
export const dbConfig = conf;