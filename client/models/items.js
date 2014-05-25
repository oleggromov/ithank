module.exports = Backbone.Collection.extend({
	url: '/api/?m=list',
	model: require('client/models/item.js'),

	getSiblingsUrls: function(model) {
		var index = this.indexOf(model);
		var earlier = this.at(index + 1);
		var later = this.at(index - 1);

		return {
			earlier: earlier ? this.getUrlById(earlier.get('id')) : null,
			later: later ? this.getUrlById(later.get('id')) : null
		};
	},

	getLastId: function() {
		return this.at(0).get('id');
	},

	getUrlById: function(id) {
		return '/' + id;
	}
});
