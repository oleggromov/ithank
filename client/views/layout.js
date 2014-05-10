var View = require('backbone').View;
var $ = require('jquery');

module.exports = View.extend({
	el: $('.layout'),

	events: {
		'click .layout__arrow': 'changeItem'
	},

	constructor: function(router) {
		// Вызываем дефолтный конструктор
		View.apply(this);

		this.router = router;
	},

	changeItem: function(e) {
		e.preventDefault();

		this.router.navigate($(e.target).attr('href'), { trigger: true });
	}
});