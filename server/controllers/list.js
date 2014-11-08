var collectionThank = require('models/thank');
var Q = require('q');
var Const = require('const');
var ServerError = require('helpers').ServerError;
var preprocessData = require('helpers').preprocessData;

module.exports = function(req, res, next) {
	var direction = String(req.params.dir);
	var timestamp = Number(req.params.timestamp);

	if (!timestamp || (direction !== 'next' && direction !== 'prev')) {
		return Q.fcall(function() {
			return new ServerError({
				code: 502
			});
		}).then(formResultData(res, next));
	}

	var query = collectionThank.find().where('date');

	if (direction === 'next') {
		query = query.gt(timestamp);
	}
	if (direction === 'prev') {
		query = query.lt(timestamp);
	}
	query = query.limit(Const.bulkSize);

	query.exec()
		.then(
			function(list) {
				return Q.fcall(function() {
					return {
						dir: direction,
						list: list
					};
				});
			},
			function() {
				return Q.fcall(function() {
					return new ServerError({
						code: 500
					});
				})
			}
		)
		.then(formResultData(res, next), formResultData(res, next));
}

function formResultData(res, next) {
	return function(result) {
		var data = {};

		// ручка list может отдавать только json
		res.isAjax = true;

		if (result instanceof ServerError) {
			res.result.success = false;
			res.result.code = result.code;
			res.result.message = result.message;
		} else {
			res.result.success = true;
			res.result.code = 200;
			res.result.message = null;

			preprocessData(result.list);
			data = result;
		}

		res.result.data = data;
		next();
	};
}