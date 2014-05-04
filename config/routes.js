module.exports = setupRoutes;

/**
 * @example
 *   require('app/routes')({
 *       config: {...},
 *       app: express()
 *   })
 */
function setupRoutes(settings) {
    var app = settings.app;

    // example router
    app.get('/', function(req, res) {
      res.render('index', {
        title: 'Я благодарю',
        message: 'Hello, world!'
      });
    });
}