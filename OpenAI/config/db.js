const parse = require('pg-connection-string').parse;
const logger = require("../utils/logger");
const config = require("../config");
let read_replicas=null;
let pool  = {
        "max": 10,
        "min": 0,
        "idle": 5000,
        "acquire": 50000,
        "handleDisconnects": true 
};

const getParamsFromDBUrl=(url)=>{
        try{
                if(url){
                        const tmp_urls = url.split(",");
                        const urls = tmp_urls.map((tmp_url)=>{
                        return parse(tmp_url);
                        })
                        return urls;
                }
        }catch(e){
                logger.warn("Unable to process URL");
                logger.warn(e.stack);
        }
        return null;
}
pool = config.getJsonFromEnv("db_pool");
const writer = getParamsFromDBUrl(process.env.DB_CONNECTION_URL);
read_replicas = getParamsFromDBUrl(process.env.DB_CONNECTION_READ_URL);
const db_config = {
        "db_connection_url": process.env.DB_CONNECTION_URL,
        "writer":writer,
        "read_replicas":read_replicas,
        "dialect": "postgres",
        "ssl": process.env.db_ssl||false,
        "pool": pool,
        
}

const getSequelizeConfig = ()=>{
      let config =   {
                dialect: db_config.dialect,
                port: 5433,

                pool: db_config.pool,
                logging: (msg)=>{
                        if(process.env.NODE_ENV !== 'production' ){
                                logger.info(msg);
                        } 
                }
        }
        return config;

}
module.exports={db_config,getSequelizeConfig};