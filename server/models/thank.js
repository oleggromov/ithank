var mongoose = require('mongoose');
var Q = require('q');

var User = {
	sex: String,
	name: String,
	nameGenetive: String,
	idVk: Number
};

var Schema = new mongoose.Schema({
	id: Number,
	from: User,
	to: User,
	date: {
		type: Date,
		default: Date.now
	},
	reason: String
}, {
	collection: 'thanks'
});

// Schema.statics содержит методы всей коллекции
// Schema.methods содержит методы конкретной записи в коллекции

/**
 * Возвращает id «соседей» документа
 * @param {Function} done
 */
Schema.methods.getSiblingsIds= function(done) {
	var date = this.date.getTime();
	var promises = [
		/**
		 * Делим список на две части: до и после текущей записи по дате
		 * и получаем первые записи относитель нее — «соседей»
		 */
		this.model('Thank').findOne().where('date').lt(date).sort("-date").exec(),
		this.model('Thank').findOne().where('date').gt(date).sort("date").exec()
	];

	Q.allSettled(promises)
		.spread(function(earlier, later) {
			var ids = {
				earlier: null,
				later: null
			};

			if (earlier.state === 'fulfilled' && earlier.value) {
				ids.earlier = earlier.value.get('id');
			}
			if (later.state === 'fulfilled' && later.value) {
				ids.later = later.value.get('id');
			}

			done(ids);
		});
};

module.exports = mongoose.model('Thank', Schema);
