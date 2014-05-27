var AppView = require('client/views/app.js');
var app = new AppView;

Backbone.history.start({ 
	pushState: true,
	silent: true
});