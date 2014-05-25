var mongoose = require('mongoose');
var Q = require('q');

var user = {
	sex: String,
	name: String,
	nameGenetive: String,
	idVk: Number
};

var schemaThank = new mongoose.Schema({
	id: Number,
	from: user,
	to: user,
	date: {
		type: Date,
		default: Date.now
	},
	reason: String
}, {
	collection: 'thanks'
});

/**
 * Возвращает id «соседей» документа
 * @param {Function} done
 */
schemaThank.methods.getAssociateIds = function(done) {
	var promises = [
		/**
		 * [1, 2, ..., 5, ..., 8, 9, 10, 11]
		 * Делим список на две части, относительно указанного id,
		 * сортируем каждый по дате и выбираем первые документы каждой части
		 */
		this.model('Thank').findOne().where('id').lt(this.id).sort("-date").exec(),
		this.model('Thank').findOne().where('id').gt(this.id).sort("date").exec()
	];

	Q.allSettled(promises)
		.spread(function(getPrev, getNext) {
			var ids = {};
			var prev = getPrev.value;
			var next = getNext.value;

			if (getPrev.state === 'fulfilled') {
				ids.prev = (prev) ? prev.get('id') : null;
			}
			if (getNext.state === 'fulfilled') {
				ids.next = (next) ? next.get('id') : null;
			}

			done(ids);
		});
};

module.exports = mongoose.model('Thank', schemaThank);