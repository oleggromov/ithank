var mongoose = require('mongoose');

var schemaThank = new mongoose.Schema({
	id: Number,
	from: {
		sex: String,
		name: String,
		nameGenetive: String,
		idVk: Number
	},
	to: {
		sex: String,
		name: String,
		nameGenetive: String,
		idVk: Number
	},
	date: {
		type: Date,
		default: Date.now
	},
	reason: String
}, {
	collection: 'thanks'
});

module.exports = mongoose.model('Thank', schemaThank);