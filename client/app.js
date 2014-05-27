var Item = require('client/models/item.js');
var Items = require('client/models/items.js');

var ItemView = require('client/views/item.js');
var FormView = require('client/views/form.js');

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
		this.$earlier = this.$('.ithank__show_earlier');
		this.$later = this.$('.ithank__show_later');
	},

	showForm: function() {
		if (!this.createForm) {
			this.createForm = new FormView;
		}

		this.$fillet.empty().append(this.createForm.render().el);
		this.$earlier.addClass('ithank__show_hidden');
		this.$later.addClass('ithank__show_hidden');
	},

	showThank: function(id) {
		var model = this.collection.get(id);

		if (!id || !model) throw new Error(JSON.stringify({ id: id, model: model }));

		var view = new ItemView({ model: model });
		this.$fillet.empty().append(view.render().el);

		var siblings = this.collection.getSiblingsUrls(model);
		this._showUrls(siblings);
	},

	goHome: function() {
		this.showThank(this.collection.getLastId());
	},

	_showUrls: function(urls) {
		if (urls.earlier) {
			this.$earlier.attr('href', urls.earlier);
			this.$earlier.removeClass('ithank__show_hidden');
		} else {
			this.$earlier.addClass('ithank__show_hidden');
		}

		if (urls.later) {
			this.$later.attr('href', urls.later);
			this.$later.removeClass('ithank__show_hidden');
		} else {
			this.$later.addClass('ithank__show_hidden');
		}
	}
});


var app = new AppView({
	collection: new Items
});

Backbone.history.start({ 
	pushState: true,
	silent: true
});