module.exports = function(app, config) {
  return function(req, res) {
    res.render('index', {
      title: 'Я благодарю',
      message: 'Hello, world!'
    });
  };
};