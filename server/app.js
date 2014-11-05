var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');
var express = require('express');

module.exports = app;

function app(env, port) {
	var config = require('./config.js')[env];
	var logger = new (require('log'))('info', config.output);
	var app = express();

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

	app.use(app.router);

	app.get('/list/:dir/:id', require('controllers/list'));
	app.get('/:id', require('controllers/thank'));
	app.get('/', require('controllers/index'));

	app.use(function(req, res) {
		if (res.result.isAjax) {
			res.send(res.result.data);
			return;
		}
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

	mongoose.connect(config.db);
	mongoose.connection.on('error', logger.error.bind(logger));
	mongoose.connection.once('open', logger.info.bind(logger, 'Mongo connection established'));
	mongoose.connection.on('disconnected', logger.info.bind(logger, 'Mongo connection closed'));

	app.listen(port);
	logger.info('Express app started on port %s', port);

	return app;
}
