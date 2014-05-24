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

		this.collection.set([
			{ "id": 1, "to": { "sex": "M", "name": "Виктор Карпов", "nameGenetive": "Виктору Карпову", "idVk": "1" }, "from": { "sex": "M", "name": "Олег Громов", "nameGenetive": "Олегу Громову", "idVk": "2" }, "reason": "всё хорошее" },
			{ "id": 3, "to": { "sex": "M", "name": "Олег Громов", "nameGenetive": "Олегу Громову", "idVk": "2" }, "from": { "sex": "M", "name": "Виктор Карпов", "nameGenetive": "Виктору Карпову", "idVk": "1" }, "reason": "много-много хороших впечатлений" },
			{ "id": 2, "to": { "sex": "M", "name": "Виктор Карпов", "nameGenetive": "Виктору Карпову", "idVk": "1" }, "from": { "sex": "M", "name": "Олег Громов", "nameGenetive": "Олегу Громову", "idVk": "2" }, "reason": "отличную работу!" }
		]);
	},

	showForm: function(e) {
		e.preventDefault();

		if (!this.createForm) {
			this.createForm = new FormView;
		}

		this.$('.ithank__fillet').empty().append(this.createForm.render().el);
	},

	showThank: function(e) {
		e.preventDefault();

		var id = $(e.target).attr('href').match(/\d+/)[0];
		var model = this.collection.get(id);

		if (!id || !model) throw new Error('Fuck noooo!');

		var view = new ItemView({ model: model });
		this.$('.ithank__fillet').empty().append(view.render().el);

		this.router.navigate('/' + id);
	},

	goHome: function(e) {
		e.preventDefault();
	}
});


var app = new AppView({
	collection: new Items
});

Backbone.history.start({ pushState: true });