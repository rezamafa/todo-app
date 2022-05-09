import express from "express";
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import {json} from 'body-parser';
import router from './api/v1';
import {MongoHelper} from './api/database/mongoHelper'
import {serverConfig} from './api/config/serverConfig'
 
// Initialize Express Server
let app = express();
app.use(cors());
app.use(compression());
app.use(json());
app.use(helmet());
app.use(morgan('dev'));

// Initialize API routes from ./api/v1/routes .
app.use('/', router);
console.log("Routers has been initialized."); 

// Running Http server on specified port .
let server = app.listen(serverConfig.port);
server.on('error', (err) => { console.error(err); });
server.on('listening', async () => { 
    try {
        await MongoHelper.connect();
    } catch (err) {
        console.error(err);
    }
    console.info(`Server listening on  port  ${serverConfig.port} : `); 
});