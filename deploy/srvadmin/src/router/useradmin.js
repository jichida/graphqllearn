
import dbs from './adminroute.js';
import middlewareauth from './middlewareauth.js';
import _ from 'lodash';
import adminauth from './adminauth.js';
import curd from './curd.js';

const startmodule = (app)=>{

  app.post('/adminauth/v1',adminauth);

  _.map(dbs,(schmodel,keyname)=>{
      const urlname = `/adminapi/v1${schmodel.urlname}`;
      app.post(urlname,middlewareauth,curd(schmodel));
      app.get(urlname,middlewareauth,curd(schmodel));
      app.put(urlname,middlewareauth,curd(schmodel));
      app.delete(urlname,middlewareauth,curd(schmodel));
      app.options(urlname,middlewareauth,curd(schmodel));
  });

};

export default startmodule;
