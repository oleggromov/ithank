var collectionThank = require('models/thank');

module.exports = function(req, res) {
	collectionThank.findOne({}).sort('-id').exec()
		.then(function(item) {
			if (!item) {
				res.redirect('/err/404');
			}

			res.redirect('/' + item.id);
		});
};