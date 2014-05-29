/**
 * Роутер принимает в конструкторе хэш с роутами вида { rule: RegExp, name: String } 
 * и сохраняет его на будущее, добавляя роуты по одному.
 */
module.exports = Backbone.Router.extend({
	constructor: function(routes) {
		_.each(routes, function(rule) {
			this.route(rule.route, rule.name);
		}.bind(this));

		this._routes = routes;
	},

	/**
	 * Триггерит событие route:name и делает history.pushState, если ссылка совпадает с одним из роутов.
	 * @param  {String} link Ссылка / путь от корня
	 * @return {Boolean} Совершился переход или нет.
	 */
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
