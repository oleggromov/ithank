var path = require('path');
var _ = require('lodash-node/underscore');

module.exports = getConfig;

var common = {
  root: path.resolve(__dirname, '../../'),
  log: 'node.log'
};

var config = {};

config.development = _.extend(common, {
  db: 'mongodb://localhost/ithank'
});

config.production = _.extend(common, {});

/**
 * @example
 *   require('config/app')({
 *     env: 'development'
 *   })
 */
function getConfig(env) {
  return config[env];
}