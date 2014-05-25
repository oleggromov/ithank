var modelThank = require('models/thank');
var Q = require('q');
var _ = require('lodash');

module.exports = function (req, res, next) {
	var id = Number(req.params.id);

	if (!isRequestedIdValid(id)) {
		req.state.status = 'error';
		req.state.code = 404;
		req.state.message = 'Wrong ID';
		next();
	}

	modelThank.findOne({ id: id }).exec()
		.then(function(thank) {
			if (!thank) {
				req.state.status = 'error';
				req.state.code = 404;
				req.state.message = 'Document not found';
				next();
			}

			thank.getAssociateIds(function(ids) {
				var urls = {
					prev: (ids.prev) ? '/' + ids.prev : null,
					next: (ids.next) ? '/' + ids.next : null
				};
				var data = _.clone(thank.toJSON());

				delete data._id;

				req.state.status = 'success';
				req.state.code = 200;
				req.state.data = {title: 'Я благодарю', item: data, urls: urls};
				next();
			});
		});
};

function isRequestedIdValid(id) {
	if (_.isNaN(id)) {
		return false;
	}
	return id > 0;
}