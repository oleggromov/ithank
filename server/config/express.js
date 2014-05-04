var path = require('path');
module.exports = setupExpress;

/**
 * @example
 *   require('config/express')({
 *     config: {...},
 *     app: express()
 *   })
 */
function setupExpress(settings) {
  var app = settings.app;

  app.set('views', path.resolve(settings.config.root, 'templates'));
  app.set('view engine', 'jade');
  app.use(app.router);
}