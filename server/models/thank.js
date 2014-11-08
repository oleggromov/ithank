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

module.exports = mongoose.model('Thank', Schema);
