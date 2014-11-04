var collectionThank = require('models/thank');

module.exports = function(req, res) {
	collectionThank.findOne({}).sort('-id').exec()
		.then(function(item) {
			res.statusCode = 302;

			if (!item) {
				res.statusCode = 404;
				res.redirect('/err/404');
			}

			res.redirect('/' + item.id);
		});
};