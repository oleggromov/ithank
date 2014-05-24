var Item = require('client/models/item.js');
var Items = require('client/models/items.js');

var ItemView = require('client/views/item.js');
var FormView = require('client/views/form.js');

var AppView = Backbone.View.extend({
	el: $('.layout'),

	events: {
		'click .ithank__show': 'showThank',
		'click .ithank__say': 'showForm',
		'click .ithank__title-link': 'goHome'
	},

	constructor: function(options) {
		Backbone.View.call(this, options);

		var Router = Backbone.Router.extend({});
		this.router = new Router;

		this.collection.set(require('../tests/mocks/list-sparse.js'));

		this.$fillet = this.$('.ithank__fillet');
		this.$earlier = this.$('.ithank__show_earlier');
		this.$later = this.$('.ithank__show_later');
	},

	showForm: function(e) {
		e.preventDefault();

		if (!this.createForm) {
			this.createForm = new FormView;
		}

		this.$fillet.empty().append(this.createForm.render().el);
	},

	showThank: function(e) {
		e.preventDefault();

		var id = $(e.target).attr('href').match(/\d+/)[0];
		var model = this.collection.get(id);

		if (!id || !model) throw new Error(JSON.stringify({ id: id, model: model }));

		var view = new ItemView({ model: model });

		var earlierUrl = this.collection.getSiblingUrl('earlier', model);
		var laterUrl = this.collection.getSiblingUrl('later', model);

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

	goHome: function(e) {
		e.preventDefault();
	}
});


var app = new AppView({
	collection: new Items
});

Backbone.history.start({ pushState: true });