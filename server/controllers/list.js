var collectionThank = require('models/thank');
var Q = require('q');

module.exports = function(req, res, next) {
	var direction = String(req.params.dir);
	var id = Number(req.params.id);

	if (!id || !direction) {
		next();
		return;
	}

	collectionThank.findOne({ id: id }).exec()
		.then(getSiblingsFor(direction))
		.then(formResultData(res, next));
}

function getSiblingsFor(direction) {
	return function(thank) {
		var deferred = Q.defer();

		if (!thank) {
			deferred.resolve(null);
		} else {
			thank.getSiblings(function(siblings) {
				deferred.resolve(
					(direction === 'prev') ? siblings.prev : siblings.next
				);
			});
		}

		return deferred.promise;
	}
}

function formResultData(res, next) {
	return function(data) {

		if (!data) {
			next();
			return;
		}

		res.result.success = true;
		res.result.code = 200;
		res.result.isAjax = true;
		res.result.data = data;

		next();
	};
}