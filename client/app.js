var ItemModel = require('client/models/item.js');
var ListCollection = require('client/models/list.js');

var ItemView = require('client/views/item.js');
var ListView = require('client/views/list.js');
var AppView = require('client/views/layout.js');

var IthankRouter = Backbone.Router.extend({
	routes: {
		"": "showList",
		":id": "showThank"
	},

	showList: function() {
		this.list = new ListCollection();
		this.listView = new ListView({ model: this.list });

		this.list.on('change', this.listView.render, this.listView);
		this.list.on('add', this.listView.render, this.listView);
		this.list.on('reset', this.listView.render, this.listView);

		this.list.fetch();	
	},

	showThank: function(id) {
		var thank = this.list.findWhere({ id: Number(id) });

		if (thank) {
			var thankView = new ItemView({ model: thank, el: $('.thank')[0] });
			thankView.render();
		} else {
			console.log('nothing found');
		}
	}
});

var router = new IthankRouter();
Backbone.history.start({ pushState: true });

var app = new AppView(router);