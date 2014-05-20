var modelThank = require('models/thank');
var Q = require('q');

module.exports = function(req, res) {
	// Лучше так, потому что parseInt('123abc') вернёт 123, а Number('123abc') — NaN.
	// Второе правильно.
	var id = Number(req.params.id);
	
	// В любом случае будет какой-то json.
	var result = { 
		status: true,
		// Вообще при ошибке бэкбону они не нужны, а в шаблоне должно быть что-то.
		urls: {
			next: null,
			prev: null
		}
	};

	// Свалка для промисов.
	var promises = [];

	// Проверять здесь на превышение максимального ID не знаю как, т.к. надо лезть в базу.
	if (isNaN(id) || id < 1 /* || id > maxId */) {
		result.status = false;
		result.message = 'Incorrect ID';

		serveResult(result);
		return;
	}

	// По-моему, так немного наглядней.
	promises.push(modelThank.count().exec());
	promises.push(modelThank.findOne({ id: id }).exec());

	// Так не круто прокидывать значения из головной функции, 
	// но всё равно намного аккуратнее, чем с колбэками.
	Q.allSettled(
		promises
	).spread(
		getAllResults(req, res, id, result)
	);
};

/** 
 * Собирает все результаты и отдаёт общий ответ.
 * 
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 */
function getAllResults(req, res, id, result) {
	return function(countAll, getThankById) {
		// Видимо надо достать элемент с максимальной датой и считать его ID последним.
		var lastId = 99999;

		// Это я не знаю, зачем нужно. Вернёт оно "4" для базы с [1, 2, 3, 4:deleted, 5, 6], 
		// хотя последний ID == 6, и что с этим делать?
		var numberAll = (countAll.state === 'fulfilled') ? countAll.value : id;

		if (getThankById.state === 'fulfilled') {
			result.thank = getThankById.value;

			// Кажется, так проще.
			// Самая большая проблема в том, что ряд ID может быть не сплошным.
			// Т.е. идут [1, 2, 3, 4:deleted, 5, 6] — и в таком случае после 3 должен быть 5, а до 5 — 3.
			// Надо придумать, что с этим делать.
			var nextId = Math.min(id + 1, lastId);
			var prevId = Math.max(id - 1, 1);

			// Вот урлы вообще модель должна возвращать, это в её юрисдикции.
			result.urls.next = '/' + nextId;
			result.urls.prev = '/' + prevId;
		} else {
			result.status = false;
			result.message = getThankById.reason;
		}
		
		serveResult(req, res, result);
	};
}


/**
 * Отдаёт результат в виде JSON или HTML
 * 
 * @param  {[type]} req    [description]
 * @param  {[type]} res    [description]
 * @param  {[type]} result [description]
 */
function serveResult(req, res, result) {
	if (req.isAjax) {
		// Урлы никуда не запихнули.
		// В идеале бы прийти к ситуации, в которой объект, передаваемый в шаблон,
		// включает в себя объект, отдаваемый бэкбону, но не наоборот.
		res.json(result);
		return;
	}

	res.render(
		'index', {
			// Что-то полезное надо писать в тайтл.
			title: 'Я благодарю',
			item: null,
			thank: result.thank,
			// Урлы куда-то наверное нужны, но надо подумать.
			nextUrl: result.urls.next,
			prevUrl: result.urls.prev
		}
	);
}