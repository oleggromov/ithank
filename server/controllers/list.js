var Const = require('const.js');

module.exports = function(req, res, next) {
	var dir = req.params.dir == 'next' ? 'next' : 'prev';
	var date = new Date(Number(req.params.date));

	delete res.result.message;
	
	res.result.code = 200;
	res.result.success = true;

	var data = {
		date: date,
		dir: dir
	};
	// TODO возврщает кусок массива длины Const.bulkSize
	data[dir] = require('../../tests/mocks/data-dev.json').slice(0, Const.bulkSize);

	res.result.data = data;

	next();
};