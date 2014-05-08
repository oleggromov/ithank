var modelExample = require('models/example');

module.exports = function(req, res) {
  modelExample.find(function(err, items) {
    if (err) {
      res.json(JSON.stringify(err));
      return;
    }

    res.render('index', {
      title: 'Я благодарю',
      message: 'Hello, world!',
      items: items.length
    });
  });
};