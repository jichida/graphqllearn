import winston from 'winston';
// const moment = require('moment');
import path from 'path';
import config from '../config';
require('winston-daily-rotate-file');
let logger;

const initLog =  ()=>{
  const filename = `${config.get('app:name')}` ;

  const logfile = `${config.get('app:logdir')}/${filename}.log`;
  const logpath = path.resolve(__dirname,'../', logfile);
  ////console.log(`logpath==>${logpath}`);

  const logfileerr = `${config.get('app:logdir')}/${filename}_err.log`;
  const logpatherr = path.resolve(__dirname,'../', logfileerr);

  const logfilewarn = `${config.get('app:logdir')}/${filename}_warn.log`;
  const logpathwarn = path.resolve(__dirname,'../', logfilewarn);

  // winston.configure({
  //   transports: [
  //     new (winston.transports.File)({ filename: logpath ,level: 'info'}),
  //     new (winston.transports.File)({  filename: logfileerr, level: 'error'  }),
  //   ]
  // });

  const dailyRotateFileTransport = new winston.transports.DailyRotateFile({
    filename: `${config.get('app:logdir')}/%DATE%-${filename}.log`,
    datePattern: 'YYYY-MM-DD'
  });
  const format = winston.format;
  logger = winston.createLogger({
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
      new (winston.transports.File)({
        name: 'info-file',
        filename: logpath ,
        level: 'info'
      }),
      new (winston.transports.File)({
        name: 'error-file',
        filename: logpatherr,
        level: 'error'
      }),
      new (winston.transports.File)({
        name: 'warn-file',
        filename: logpathwarn,
        level: 'warn'
      }),
      dailyRotateFileTransport
    ]
  });
};

const getlog = ()=>{
   return logger;
}

export default {initLog,getlog};