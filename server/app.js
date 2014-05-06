var port = process.env.ITHANK_PORT || 3000;
var env = process.env.ITHANK_ENV || 'development';

var fs = require('fs');
var path = require('path');

// Нужный вариант конфига вытаскивается в зависимости от ITHANK_ENV
var config = require('config/app')(env);

var mongoose = require('mongoose');
var express = require('express');

var streamOut = (env === 'development') ? process.stdout : fs.createWriteStream(path.resolve(config.root, config.log));
var logger = new (require('log'))('info', streamOut);

var app = express();

app.set('views', path.resolve(config.root, 'templates'));
app.set('view engine', 'jade');
app.use(app.router);

app.get('/', require('controllers/example'));

mongoose.connect(config.db);

mongoose.connection.on('error', logger.error.bind(logger));
mongoose.connection.once('open', logger.info.bind(logger, 'Mongo connection established'));
mongoose.connection.on('disconnected', logger.info.bind(logger, 'Mongo connection closed'));

app.listen(port);

logger.info('Express app started on port %s', port);

if (env !== 'development') {
    fs.writeFile('node.pid', process.pid);
}

module.exports = app;