var collectionThank = require('models/thank');

module.exports = function(req, res) {
	collectionThank.findOne({}).sort('-id').exec()
		.then(function(item) {
			res.statusCode = 302;

			if (!item) {
				res.send(404);
				return;
			}

			res.redirect('/' + item.id);
		});
};