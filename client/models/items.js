module.exports = Backbone.Collection.extend({
	url: '/api/?m=list',
	model: require('client/models/item.js'),

	getLastUrlByNow: function() {
		this.filter(function(thank) {
			console.log(thank.toJSON());
		});

		return this.getUrlById(1);
	},

	getUrlById: function(id) {
		return '/' + id;
	}
});
