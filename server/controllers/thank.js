var collectionThank = require('models/thank');
var Q = require('q');
var Const = require('const');
var ServerError = require('helpers').ServerError;
var preprocessData = require('helpers').preprocessData;

module.exports = function (req, res, next) {
	var id = Number(req.params.id);

	if (!id || id < 0) {
		return Q.fcall(function() {
			return new ServerError({
				code: 404
			});
		}).then(formResultData(res, next));
	}

	collectionThank.findOne({ id: id }).exec()
		.then(getSiblings, function() {
			return Q.fcall(function() {
				return new ServerError({
					code: 500
				});
			});
		})
		.then(formResultData(res, next), formResultData(res, next));
};

/**
 * Достает соседей благодарности
 * в количестве Const.bulkSize с каждой стороны
 *
 * @param  {Object} thank благодарность
 * @return {Object}           промис
 */
function getSiblings(thank) {
	var deferred = Q.defer();

	if (!thank) {
		deferred.reject(new ServerError({
			code: 404
		}));
	} else {
		var timestamp = thank.date.getTime();

		var queryEarlier = collectionThank.find().where('date').lt(timestamp).sort("-date").limit(Const.bulkSize);
		var queryLater = collectionThank.find().where('date').gt(timestamp).sort("date").limit(Const.bulkSize);

		Q.allSettled([
			queryEarlier.exec(),
			queryLater.exec()
		])
			.spread(function(earlier, later) {
				deferred.resolve({
					item: thank.toJSON(),
					earlier: earlier.value,
					later: later.value
				});
			});
	}

	return deferred.promise;
}

/**
 * Формирует данные на основе полученного
 * экземпляра модели и айди соседей
 * и дергает next для передачи управления в следующий мидлварь
 *
 * @param  {Object} result  данные, полученный от моделей
 */
function formResultData(res, next) {
	return function(result) {

		var data = {
			title: 'Я благодарю'
		};

		if (result instanceof ServerError) {
			res.result.success = false;
			res.result.code = result.code;
			res.result.message = result.message;
			res.result.page = 'index';
		} else {
			res.result.success = true;
			res.result.code = 200;
			res.result.message = null;
			res.result.page = 'index';

			preprocessData(result.item);
			var bulk = [].concat(result.earlier, result.item, result.later);
			preprocessData(bulk);

			data = {
				item: result.item,
				urlEarlier: getUrl(result.earlier),
				urlLater: getUrl(result.later),
				bulk: JSON.stringify(bulk)
			};
		}

		res.result.data = data;
		next();
	};
}

/**
 * Формирует ссылку на следующий и предыдущий урл
 * @param  {Array} items коллекция
 * @return {String} ссылка
 */
function getUrl(items) {
	if (!items.length) {
		return null;
	}
	var id = items[0].get('id');

	return (id) ? '/' + id : null;
}
