var _ = require('lodash');

var config = {};
var common = {
	root: process.cwd(),
	log: 'run/node.log'
};

config.development = _.extend(_.clone(common), {
	db: 'mongodb://localhost/ithank_dev'
});

config.test = _.extend(_.clone(common), {
	db: 'mongodb://localhost/ithank_test'
});

config.production = _.extend(_.clone(common), {});

module.exports = config;