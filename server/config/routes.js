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
    var something = require('server/models/example')(settings.mongoose);

    // example router
    app.get('/', require('server/controllers/example')(app, settings.config, something));
}