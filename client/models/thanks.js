var Model = require('backbone').Model;
var Collection = require('backbone').Collection;

var ThankModel = Model.extend({});

var ThanksCollection = Collection.extend({
	model: ThankModel
});

module.exports = {
	model: ThankModel,
	collection: ThanksCollection
};