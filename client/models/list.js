var Collection = require('backbone').Collection;
var ItemModel = require('client/models/item.js');

module.exports = Collection.extend({
	url: '/',
	model: ItemModel
});
