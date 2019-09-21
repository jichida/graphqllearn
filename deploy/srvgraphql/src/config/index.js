import nconf from 'nconf';
import debugx from 'debug';

const debug = debugx('srv:config');



function Config() {
  nconf.argv().env();

  const configpath =  nconf.get('configpath') || '';
  debug(`load config:${configpath}`);

  nconf.file({file:`${configpath}`});
}

Config.prototype.get = function(key) {
  return nconf.get(key);
};

const config = new Config();

export default  config;

