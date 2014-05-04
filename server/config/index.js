module.exports = setupAll;

var setupExpress = require('server/config/express');
var setupRoutes = require('server/config/routes');

function setupAll(settings) {
    setupExpress(settings);
    setupRoutes(settings);
}