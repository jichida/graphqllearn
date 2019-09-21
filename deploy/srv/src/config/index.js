const nconf = require('nconf');
const debug = require('debug')('srv:config');
// const path = require('path');

function Config() {
  nconf.argv().env();

  const configpath =  nconf.get('configpath') || '';
  debug(`load config:${configpath}`);

  nconf.file({file:`${configpath}`});
}

Config.prototype.get = function(key) {
  return nconf.get(key);
};

module.exports = new Config();
