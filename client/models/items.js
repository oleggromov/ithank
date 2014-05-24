module.exports = Backbone.Collection.extend({
	url: '/api/?m=list',
	model: require('client/models/item.js'),

	getSiblingUrlByModel: function(which, model) {
		var index = this.indexOf(model);
		var found;

		if (which === 'earlier') {
			found = this.at(index + 1);
		} else if (which === 'later') {
			found = this.at(index - 1);
		}

		if (!found) return null;

		return this.getUrlById(found.get('id'));	
	},

	getLastId: function() {
		return this.at(0).get('id');
	},

	getUrlById: function(id) {
		return '/' + id;
	}
});
