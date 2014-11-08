var _ = require('lodash');

module.exports = {
	/**
	 * Конструктор для кастомных объектов ошибок,
	 * с помощью которых удобно контролировать выдачу
	 *
	 * @example
	 *  // где-то в обработчике реджекта промиса
	 *  return new ServerError({
	 *      code: 404,
	 *      message: 'Not Found'
	 *  })
	 *
	 *  // где-то в обработчике then промиса
	 *  if (result instanceof ServerError) {
	 *    ...
	 *  }
	 */
	ServerError: function (info) {
		var message = '';

		if (info.code === 404) {
			message = 'Not found';
		}
		if (info.code === 500) {
			message = 'Mongo failed';
		}
		if (info.code === 502) {
			message = 'Bad gateway'
		}

		this.code = info.code;
		this.message = info.message || message;
	},

	preprocessData: function(data) {
		if (_.isArray(data)) {
			_.forEach(data, function(item) {
				item._id = null;
			});
		}
		if (_.isPlainObject(data)) {
			data._id = null;
		}
	}
};