module.exports = setupAll;

var setupExpress = require('config/express');
var setupRoutes = require('config/routes');

function setupAll(settings) {
    setupExpress(settings);
    setupRoutes(settings);
}