var modelExample = require('models/example');

var sample = [
	{ id: 1, from: 'Виктор Карпов', to: 'Михайло Ломоносов', reason: 'всё хорошее' },
	{ id: 2, from: 'Ваня Михайлов', to: 'Иван Иванович', reason: 'отличную работу' },
	{ id: 3, from: 'Михайло Ломоносов', to: 'Виктор Леонидович', reason: 'много денег' },
	{ id: 4, from: 'Олег Громов', to: 'Юрий Петрович', reason: 'невероятные приключения итальянцев в России' }
];

module.exports = function(req, res) {
	// Пришёл бэкбон
	if (req.headers['x-requested-with'] === 'XMLHttpRequest') {
		res.json(sample);
	} else {
		modelExample.find(function(err, items) {
			if (err) {
				res.json(JSON.stringify(err));
				return;
			}

			res.render('index', {
				title: 'Я благодарю',
				item: {
					to: 'Константин Константинопольский',
					from: 'Олег Громов',
					reason: 'всё невероятное и невозможное, что приключилось со мной'	
				},
				nextUrl: '/3',
				prevUrl: '/1'
			});
		});
	}
};