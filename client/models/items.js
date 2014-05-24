module.exports = Backbone.Collection.extend({
	url: '/api/?m=list',
	model: require('client/models/item.js'),

	getSiblingUrlById: function(type, model) {
		var index = this.indexOf(model);
		var found;

		if (type === 'earlier') {
			found = this.at(index + 1);
		} else if (type === 'later') {
			found = this.at(index - 1);
		}

		if (!found) return null;

		return this.getUrlById(found.get('id'));	
	},

	getLastUrlByNow: function() {
		this.filter(function(thank) {
			console.log(thank.toJSON());
		});

		return this.getUrlById(10);
	},

	getUrlById: function(id) {
		return '/' + id;
	}
});
