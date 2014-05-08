var _ = require('lodash-node/underscore');

var config = {};
var common = {
  root: process.cwd(),
  log: 'node.log'
};

config.development = _.extend(common, {
  db: 'mongodb://localhost/ithank'
});

config.production = _.extend(common, {});


module.exports = config;