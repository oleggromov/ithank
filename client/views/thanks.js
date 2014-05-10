var View = require('Backbone').View;

var ThanksView = View.extend({
	tagName: 'article',
	className: 'thank',
	render: function() {
		console.log('render ThanksView instance');
		console.log(this.model.attributes);
	}
});

module.exports = ThanksView;