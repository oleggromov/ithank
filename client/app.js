var Item = require('client/models/item.js');
var Items = require('client/models/items.js');

var ItemView = require('client/views/item.js');
var FormView = require('client/views/form.js');

var Router = Backbone.Router.extend({
	_routes: [
		{ route: /^$/, action: 'goHome' },
		{ route: /^(\d+)$/, action: 'showThank' },
		{ route: 'write', action: 'showForm' }
	],

	constructor: function(app) {
		this.app = app;

		_.each(this._routes, function(el) {
			this.route(el.route, el.action, this.app[el.action].bind(this.app));
		}.bind(this));
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

		this.router = new Router(this);

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

		this.router.navigate('/write');
	},

	parseThankLink: function(e) {
		e.preventDefault();
		var id = $(e.target).attr('href').match(/\d+/)[0];

		if (!id) return;

		this.showThank(Number(id));
	},

	showThank: function(id) {
		var model = this.collection.get(id);

		if (!id || !model) throw new Error(JSON.stringify({ id: id, model: model }));

		var view = new ItemView({ model: model });

		var earlierUrl = this.collection.getSiblingUrlByModel('earlier', model);
		var laterUrl = this.collection.getSiblingUrlByModel('later', model);

		this.$fillet.empty().append(view.render().el);

		if (earlierUrl) {
			this.$earlier.attr('href', earlierUrl);
			this.$earlier.removeClass('ithank__show_hidden');
		} else {
			this.$earlier.addClass('ithank__show_hidden');
		}

		if (laterUrl) {
			this.$later.attr('href', laterUrl);
			this.$later.removeClass('ithank__show_hidden');
		} else {
			this.$later.addClass('ithank__show_hidden');
		}

		this.router.navigate(this.collection.getUrlById(id));
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