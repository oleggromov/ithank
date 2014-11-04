var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var config = {};
var common = {
	root: process.cwd(),
	log: 'run/node.log',
	const: require('const.js')
};

config.development = _.extend(_.clone(common), {
	db: 'mongodb://localhost/ithank_dev',
	output: process.stdout
});

config.test = _.extend(_.clone(common), {
	db: 'mongodb://localhost/ithank_test',
	output: process.stdout
});

config.production = _.extend(_.clone(common), {
	db: 'mongodb://localhost/ithank',
	output: fs.createWriteStream(
		path.resolve(common.root, common.log), { flags: 'a' }
	)
});

module.exports = config;