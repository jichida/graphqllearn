import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import config from './config';
import winston from './log';
import debugx from 'debug';
import http from 'http';
import bodyParser from 'body-parser';
import initDB from './db/dbinit';

import useradmin from './router/useradmin.js';
import useradmincustom from './router/useradmincustom.js';

const debug = debugx('srv:start');
const uri = config.get('app:MONGO_URL');

winston.initLog();


const startServer = async () => {
    debug(`start connect mongodb`);
    await mongoose.connect(uri, {
      useNewUrlParser: true,useFindAndModify: false  });
  
    await initDB();
    const app = express();
    app.use(cors());
    app.use(bodyParser.json({limit: '200mb'}));
    app.use(bodyParser.urlencoded({limit: '200mb', extended: true}))
  
    
    useradmin(app);
    useradmincustom(app);

    const httpServer = http.createServer(app);
    httpServer.listen({ port:config.get('app:listenport')}, ()=>{
        ////console.log('listening on *:' + config.listenport);
        winston.getlog().info(`start server:${config.get('app:listenport')}`);
    });
};

try{
    startServer();
  }
  catch(e){
    debug(`get error--->`);
    debug(e);
  }
   