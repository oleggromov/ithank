var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3000;

var fs = require('fs');
var path = require('path');

var config = require('config/app')({
    env: env
});

var mongoose = require('mongoose');
var express = require('express');
var logger = new (require('log'))('info', fs.createWriteStream(path.resolve(config.root, config.log)));

var app = express();

require('config')({
    config: config,
    app: app
});

mongoose.connect(config.db);

mongoose.connection.on('error', logger.error.bind(logger));
mongoose.connection.once('open', logger.info.bind(logger, 'Mongo connection established'));
mongoose.connection.on('disconnected', logger.info.bind(logger, 'Mongo connection closed'));

(function preloadAllModels() {
    var pathModels = path.resolve(config.root, 'app/models');

    fs.readdirSync(pathModels).forEach(function(file) {
      if (/\.js$/.test(file)) {
        require(path.resolve(pathModels, file));
      }
    });
}());

app.listen(port);

logger.info('Express app started on port %s', port);
fs.writeFile('.pid-node', process.pid);

module.exports = app;