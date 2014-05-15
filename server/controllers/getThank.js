module.exports = function(req, res) {
	var data = {};

	if (req.params.id % 2) {
		data = {
			from: 'Карпыч',
			to: 'Громыч',
			reason: 'всё на свете'
		};
	} else {
		data = {
			from: 'Громыч',
			to: 'Карпыч',
			reason: 'всё-всё на свете'
		};
	}

	if (req.isAjax) {
		res.json(data);
	} else {
		res.render('index', {
			title: 'Я благодарю',
			item: data,
			nextUrl: '/3',
			prevUrl: '/1'
		});
	}
};