// Настройки
var port = process.env.ITHANK_PORT || 3000;
var isDebugEnabled = process.env.ITHANK_ENV === 'development';

// Зависимости
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');
var express = require('express');

// Конфиг и поток для логирования выбираются в зависимости от isDebugEnabled
var config = require('./config.js');
var streamOut;

if (isDebugEnabled) {
	config = config['development'];
	streamOut = process.stdout;
} else {
	config = config['production'];
	streamOut = fs.createWriteStream(getAbsolutePath(config.log));
}

// Инстансы
var logger = new (require('log'))('info', streamOut);
var app = express();

// Шаблоны
app.set('views', './templates');
app.set('view engine', 'jade');

// Роуты
app.use(app.router);
app.get('/', require('./controllers/example'));

// Монга
mongoose.connect(config.db);
mongoose.connection.on('error', logger.error.bind(logger));
mongoose.connection.once('open', logger.info.bind(logger, 'Mongo connection established'));
mongoose.connection.on('disconnected', logger.info.bind(logger, 'Mongo connection closed'));

// Поехали!
app.listen(port);
logger.info('Express app started on port %s', port);

// В продакшне надо сообщать PID во внешний мир
if (!isDebugEnabled) {
    fs.writeFile(getAbsolutePath('node.pid'), process.pid);
}

// Резолвит путь до абсолютного
function getAbsolutePath(relativePath) {
	return path.resolve(config.root, relativePath);
}