/**
 * Коллекция благодарностей.
 */

module.exports = Backbone.Collection.extend({
	url: '/list/next/1415132112580',
	model: require('client/models/item.js'),

	getSome: function() {
		this.fetch({
			success: function(collection, response, options) {
				console.log('success', collection, response, options);
			},
			error: function(collection, response, options) {
				console.log('error', collection, response, options);
			}
		})
	},

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
	},

	parse: function(response) {
		return response.data[response.data.dir];
	}
});
