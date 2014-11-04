var Const = require('const.js');
var Router = require('client/router.js');

var Item = require('client/models/item.js');
var Items = require('client/models/items.js');
var State = require('client/models/state.js');

var ItemView = require('client/views/item.js');
var FormView = require('client/views/form.js');
var UrlsView = require('client/views/urls.js');

module.exports = Backbone.View.extend({
	el: $('.layout'),

	events: {
		'click a': 'routeToLink'
	},

	constructor: function(options) {
		Backbone.View.call(this, options);

		this.collection = new Items;

		this.router = new Router([
			{ route: /^$/, name: 'home' },
			{ route: /^(\d+)$/, name: 'thank' },
			{ route: 'write', name: 'form' }
		]);

		this.listenTo(this.router, 'route:home', this.goHome);
		this.listenTo(this.router, 'route:thank', this.showThank);
		this.listenTo(this.router, 'route:form', this.showForm);

		this.initFromDom();

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

		// ID проверять вроде бы бессмысленно, т.к. роутер должен распарсить его иначе не сроутить сюда.
		// При отсутствии модели наверняка запрошен ID, которого нет в локальной коллекции, и надо сходить на сервер.
		// Скорее всего, это должна делать коллекция. 
		// Но модели может всё-таки не быть, если благодарность с таким ID удалена, например. Что-то в таком случае делать
		// точно нужно, но что именно — надо придумать.
		// if (!model) throw new Error(JSON.stringify({ id: id, model: model }));

		var view = new ItemView({ model: model });
		this.$fillet.empty().append(view.render().el);

		var siblings = this.collection.getSiblingsUrls(model);
		this.state.setSiblings(siblings);

		this.fetchMore(id);
	},

	goHome: function() {
		this.router.navigate(this.collection.getUrlById(this.collection.getLastId()), { trigger: true });
	},

	/**
	 * Проверяет с помощью Роутера, внутренняя ли ссылка, и, если да, делает preventDefault().
	 * @param  {Object} e Событие
	 */
	routeToLink: function(e) {
		if (this.router.navigateToIfRouted($(e.target).attr('href'))) {
			e.preventDefault();
		}
	},

	initFromDom: function() {
		this.collection.set(JSON.parse($('#bulk').text()));
		$('#bulk').remove();
	},

	fetchMore: function(id) {
		console.log(this.collection.at(this.collection.length-1).get('date'));




		// this.collection.fetch({
		// 	data: {
		// 		page: 10
		// 	}
		// });
	}
});