module.exports = Backbone.Model.extend({
	defaults: {
		urlEarlier: null,
		urlLater: null
	},

	setSiblings: function(siblings) {
		this.set('urlEarlier', siblings.earlier || null);
		this.set('urlLater', siblings.later || null);
		this.trigger('change:urls');
	},

	resetSiblings: function() {
		this.setSiblings({});
	}
});