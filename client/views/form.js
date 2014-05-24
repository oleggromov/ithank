module.exports = Backbone.View.extend({
	template: require('client/templates/create/create.js'),

	render: function() {
		var html = this.template({
			create: {
				url: '/write'
			}
		});

		this.setElement($(html));

		return this;
	}
});