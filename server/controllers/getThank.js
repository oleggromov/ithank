module.exports = function(req, res) {
	var data = require('../../tests/mocks/list-sparse.js');

	if (req.isAjax) {
		res.json(data);
	} else {
		res.render('index', {
			title: 'Я благодарю',
			item: data[0],
			laterUrl: null,
			earlierUrl: '/8'
		});
	}
};