var mongoose = require('mongoose');
var Q = require('q');
var Const = require('const');

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

/**
 * Возвращает «соседей» документа.
 * Их количество определяется константой Const.bulkSize
 * @param {Function} done
 */
Schema.methods.getSiblings = function(done) {
	var date = this.date.getTime();
	var promises = [
		/**
		 * Делим список на две части: до и после текущей записи по дате
		 * и получаем первые записи относитель нее — «соседей»
		 */
		this.model('Thank').find().where('date').lt(date).sort("-date").limit(Const.bulkSize).exec(),
		this.model('Thank').find().where('date').gt(date).sort("date").limit(Const.bulkSize).exec()
	];

	Q.allSettled(promises).spread(function(prev, next) {
		done({
			prev: prev.value,
			next: next.value
		});
	});
};

module.exports = mongoose.model('Thank', Schema);
