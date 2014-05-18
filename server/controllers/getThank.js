var modelThank = require('models/thank');
var Q = require('q');

module.exports = function(req, res) {
	// TODO
	// нужно как-то фильтровать/проверять id?
	var id = parseInt(req.params.id, 10);
	var numberItems;

	Q.allSettled([
		modelThank.count().exec(),
		modelThank.findOne({ id: id }).exec()
	])
		.then(function(results){
			var all = results[0].value;
			var thank = results[1].value;

			// TODO
			// обработка ошибок

			if (req.isAjax) {
				res.json(thank);
			} else {
				res.render('index', {
					title: 'Я благодарю',
					item: thank,
					nextUrl: '/' + getPrevNextNumber(id, 'next', [1, all]),
					prevUrl: '/' + getPrevNextNumber(id, 'prev', [1, all])
				});
			}
		});
};

/**
 * Возращает следующее/предыдущее натуральное число
 * за указанным, учитывая множество допустимых значений
 * @param  {Number}  cur  текущее знаение
 * @param  {String}  dir  направление (next, prev), по умолчанию prev
 * @param  {Array}   interval
 */
function getPrevNextNumber(cur, dir, interval) {
	var current = cur;
	var result;

	return (dir === 'next')
		? ((current < interval[1]) ? ++current : current)
		: ((current > interval[0]) ? --current : current);
}
