module.exports = Backbone.View.extend({
	tagName: 'article',
	className: 'thank',

	// такая же структура, как и в templates/, только *.js и внутри client/
	template: require('client/templates/thank/thank.js'),

	render: function() {
		var html = this.template({
			item: {
				to: this.model.get('to'),
				from: this.model.get('from'),
				reason: this.model.get('reason')
			}
		});

		this.$el.replaceWith(html);

		return this;
	}
});