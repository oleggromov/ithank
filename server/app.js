// Настройки
var port = process.env.ITHANK_PORT || 3000;

// Зависимости
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');
var express = require('express');

// Конфиг выбираем в зависимости от режима работы приложения.
var config = require('./config.js')[process.env.ITHANK_ENV];

// Инстансы
var logger = new (require('log'))('info', config.output);
var app = express();

// Шаблоны
app.set('views', 'templates');
app.set('view engine', 'jade');

app.use(function(req, res, next) {
	res.result = {
		success: false,
		code: 404,
		message: 'Not found',
		data: {}
	};
	req.isAjax = req.headers['x-requested-with'] === 'XMLHttpRequest';
	next();
});

// Роуты
app.use(app.router);
app.get('/:id', require('controllers/getThank'));
app.get('/', require('controllers/redirect'));

app.use(function(req, res) {
	if (req.isAjax) {
		res.send(res.result);
	} else {
		if (res.result.success) {
			res.render(res.result.page, res.result.data);
		} else {
			res.send(res.result.code);
		}
	}
});

// Монга
mongoose.connect(config.db);
mongoose.connection.on('error', logger.error.bind(logger));
mongoose.connection.once('open', logger.info.bind(logger, 'Mongo connection established'));
mongoose.connection.on('disconnected', logger.info.bind(logger, 'Mongo connection closed'));

// Поехали!
app.listen(port);
logger.info('Express app started on port %s', port);

// Сообщаем PID во внешний мир
fs.writeFile(path.resolve(config.root, 'run/node.pid'), process.pid);

if (process.env.ITHANK_ENV === 'test') {
	module.exports = app;
}