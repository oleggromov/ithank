var env = process.env.ITHANK_ENV || 'development';
var port = process.env.ITHANK_PORT || 3000;

var fs = require('fs');
var path = require('path');

var config = require('server/config/app')({
    env: env
});

var mongoose = require('mongoose');
var express = require('express');
var logger = new (require('log'))('info', fs.createWriteStream(path.resolve(config.root, config.log)));

var app = express();

require('server/config')({
    config: config,
    app: app
});

mongoose.connect(config.db);

mongoose.connection.on('error', logger.error.bind(logger));
mongoose.connection.once('open', logger.info.bind(logger, 'Mongo connection established'));
mongoose.connection.on('disconnected', logger.info.bind(logger, 'Mongo connection closed'));

app.listen(port);

logger.info('Express app started on port %s', port);
fs.writeFile('.pid-node', process.pid);

module.exports = app;