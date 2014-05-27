module.exports = Backbone.Router.extend({
	constructor: function(routes) {
		_.each(routes, function(rule) {
			this.route(rule.route, rule.name);
		}.bind(this));

		this._routes = routes;
	},

	navigateToIfRouted: function(link) {
		link = link.replace(/^\//, '');

		var isRouted = _.find(this._routes, function(el) {
			return link.match(el.route) !== null;
		});

		if (isRouted) {
			this.navigate(link, true);	
		}

		return isRouted;
	}
});
