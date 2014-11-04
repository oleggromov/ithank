var collectionThank = require('models/thank');
var Q = require('q');
var _ = require('lodash');

module.exports = function (req, res, next) {
	var id = Number(req.params.id);

	if (!id) {
		next();
	}

	collectionThank.findOne({ id: id }).exec()
		.then(getSiblings)
		.then(formResultData(res, next));
};

/**
 * Достает соседей благодарности,
 * возращает промис для чейна с .then()
 *
 * @param  {Object} thank благодарность
 * @return {Object}           промис
 */
function getSiblings(thank) {
	var deferred = Q.defer();

	if (!thank) {
		deferred.resolve(null);
	} else {
		thank.getSiblings(function(siblings) {
			deferred.resolve({
				item: thank.toJSON(),
				urlEarlier: getUrl(siblings.prev),
				urlLater: getUrl(siblings.next)
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
 * @param  {Object} data  данные, полученный от моделей
 * @param  {Object} ids   айди соседей
 */
function formResultData(res, next) {
	return function(data) {

		if (!data) {
			next();
		}

		// доопределяем данные
		// для передачи на клиент
		data.title = "Я благодарю";
		delete data.item._id;

		res.result.success = true;
		res.result.code = 200;
		res.result.message = null;
		res.result.page = 'index';
		res.result.data = data;

		next();
	};
}

function getUrl(items) {
	if (!items.length) {
		return null;
	}
	var id = items[0].get('id');

	return (id) ? '/' + id : null;
}