module.exports = function(mongoose) {
	var SomethingScheme = new mongoose.Schema({
		from: String,
		to: String,
		text: String,
		date: { type: Date, default: Date.now }
	}, {
		collection: 'something'
	});

	return mongoose.model('Something', SomethingScheme);
};

