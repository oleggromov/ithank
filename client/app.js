var jQuery = require('jquery');
var Backbone = require('backbone');
Backbone.$ = jQuery;

var _thanks = require('client/models/thanks.js');
var ThanksView = require('client/views/thanks.js');

var ThankModel = _thanks.model;
var ThanksCollection = _thanks.collection;

// Коллекция с фейковыми данными
var thanks = new ThanksCollection();
thanks.add([
	{ from: 'Карпыч', to: 'Громыч', 'for': 'всё на свете' },
	{ from: 'Громыч', to: 'Карпыч', 'for': 'всё-всё на свете' }
]);

// вьюшка для проверки
var view = new ThanksView({
	model: thanks.first()
});

view.render();