var _ = require('lodash');

var config = {};
var common = {
	root: process.cwd(),
	log: 'logs/node.log'
};

config.development = _.extend(_.clone(common), {
	db: 'mongodb://localhost/ithank'
});

config.production = _.extend(_.clone(common), {});

module.exports = config;