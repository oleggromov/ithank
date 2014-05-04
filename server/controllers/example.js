module.exports = function(app, config, something) {
  return function(req, res) {
  	

  	something.find(function(err, items) {
  		if (err) {
  			res.json(JSON.stringify(err));
  			return;
  		}

  		if (!items.length) {
  			res.send(404, 'Nothing found');
  			return;
  		}

  		res.render('index', {
	      title: 'Я благодарю',
	      message: 'Hello, world!',
	      items: items
	    });
  	});
  };
};