module.exports = Backbone.View.extend({
	template: require('client/templates/ithank/urls.js'),

	constructor: function(options) {
		Backbone.View.call(this, options);

		this.listenTo(this.model, 'change:urls', this.render);
	},

	render: function() {
		// Когда в State появится больше ключей, все они будут лететь в эти невинные шаблоны, и это не очень круто.
		var html = this.template(this.model.toJSON());
		// Вот это ненужный рендеринг: тут тоже надо идти в ДОМ и вешать руками классы и менять атрибуты. 
		// Как минимум, ради анимации.
		this.$el.html(html);

		return this;
	}
});