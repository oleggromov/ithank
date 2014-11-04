var collectionThank = require('models/thank');
var Q = require('q');
var _ = require('lodash');

module.exports = function (req, res, next) {
	var id = Number(req.params.id);

	if (!id) {
		next();
	}

	collectionThank.findOne({ id: id }).exec()
		.then(getSiblingsIds)
		.then(formResultData(res, next));
};

/**
 * Достает id соседей благодарности,
 * возращает промис для чейна с .then()
 *
 * @param  {Object} itemThank благодарность
 * @return {Object}           промис
 */
function getSiblingsIds(itemThank) {
	var deferred = Q.defer();

	if (!itemThank) {
		deferred.resolve(null);
		return deferred.promise;
	}

	itemThank.getSiblingsIds(function(ids) {
		var urls = getUrlsByIds(ids);

		deferred.resolve({
			item: itemThank.toJSON(),
			urlEarlier: urls.earlier,
			urlLater: urls.later
		});
	});
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

// TODO
// это какой-то хэлпер, который формирует урлы?
function getUrlsByIds(ids) {
	return {
		earlier: (ids.earlier) ? '/' + ids.earlier : null,
		later: (ids.later) ? '/' + ids.later : null
	};
}