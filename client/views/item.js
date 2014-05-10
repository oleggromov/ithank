var View = require('backbone').View;

module.exports = View.extend({
	tagName: 'article',
	className: 'thank',

	render: function() {
		this.$el.find('.thank__name').text(this.model.get('to'));
		this.$el.find('.thank__for').text(this.model.get('reason'));
		this.$el.find('strong').text(this.model.get('from'));

		return this;
	}
});