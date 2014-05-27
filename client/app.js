var Item = require('client/models/item.js');
var Items = require('client/models/items.js');

var ItemView = require('client/views/item.js');
var FormView = require('client/views/form.js');
var UrlsView = require('client/views/urls.js');

var Router = Backbone.Router.extend({
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

var State = Backbone.Model.extend({
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
		this.defaults();
	}
});


var AppView = Backbone.View.extend({
	el: $('.layout'),

	events: {
		'click a': 'routeToLink'
	},

	routeToLink: function(e) {
		if (this.router.navigateToIfRouted($(e.target).attr('href'))) {
			e.preventDefault();
		}
	},

	constructor: function(options) {
		Backbone.View.call(this, options);

		this.router = new Router([
			{ route: /^$/, name: 'home' },
			{ route: /^(\d+)$/, name: 'thank' },
			{ route: 'write', name: 'form' }
		]);

		this.listenTo(this.router, 'route:home', this.goHome);
		this.listenTo(this.router, 'route:thank', this.showThank);
		this.listenTo(this.router, 'route:form', this.showForm);

		this.collection.set(require('../tests/mocks/list-sparse.js'));

		this.$fillet = this.$('.ithank__fillet');

		this.state = new State();
		this.urlsView = new UrlsView({ 
			model: this.state,
			el: this.$('.ithank__urls')
		});
	},

	showForm: function() {
		if (!this.createForm) {
			this.createForm = new FormView;
		}

		this.$fillet.empty().append(this.createForm.render().el);
		this.state.resetSiblings();
	},

	showThank: function(id) {
		var model = this.collection.get(id);

		// TODO: подумать, зачем это вообще нужно и что тут триггерить
		if (!id || !model) throw new Error(JSON.stringify({ id: id, model: model }));

		var view = new ItemView({ model: model });
		this.$fillet.empty().append(view.render().el);

		var siblings = this.collection.getSiblingsUrls(model);
		this.state.setSiblings(siblings);
	},

	goHome: function() {
		this.showThank(this.collection.getLastId());
	}
});


var app = new AppView({
	collection: new Items
});

Backbone.history.start({ 
	pushState: true,
	silent: true
});